const md5 = require("md5");
const httpErrorCode = require("../../common/config/httpErrorCode.js");
const Base = require("./base.js");
const rp = require("request-promise");
module.exports = class extends Base {
  async loginByWeixinAction() {
    // const code = this.post('code');
    const code = this.post("code");
    const username = this.post("username");
    const password = this.post("password");
    const wxUserInfo = this.post("wxUserInfo");
    let currentTime = parseInt(new Date().getTime() / 1000);
    const clientIp = this.ctx.ip;

    // params

    // 获取openid
    const options = {
      method: "GET",
      url: "https://api.weixin.qq.com/sns/jscode2session",
      qs: {
        grant_type: "authorization_code",
        js_code: code,
        secret: think.config("weixin.secret"),
        appid: think.config("weixin.appid"),
      },
    };
    let sessionData = await rp(options);
    sessionData = JSON.parse(sessionData);
    console.info("sessionData", sessionData)
    if (!sessionData.openid) {
      return this.fail("登录失败，openid无效");
    }
    // 根据openid查找用户是否已经注册
    // let userId = await this.model("user")
    //   .where({
    //     weixin_openid: sessionData.openid,
    //   })
    //   .getField("id", true);
    // 根据username查找用户是否已经注册
    let userInfo = await this.model("user").where({username: username}).find();

    let is_new = 0;
    // const buffer = Buffer.from('微信用户');
    let nickname = '微信用户';
    if (think.isEmpty(userInfo)) {

      return this.fail(httpErrorCode.USER_NOT_FOUND.code, httpErrorCode.USER_NOT_FOUND.msg);

      // // 注册
      // userId = await this.model("user").add({
      //   username: "微信用户" + think.uuid(6),
      //   password: sessionData.openid,
      //   register_time: currentTime,
      //   register_ip: clientIp,
      //   last_login_time: currentTime,
      //   last_login_ip: clientIp,
      //   mobile: "",
      //   weixin_openid: sessionData.openid,
      //   nickname: nickname,
      //   avatar:'/static/images/default_avatar.png'
      // });
      // is_new = 1;
    }
    console.info("userInfo", userInfo)

    // not use that app.
    if(userInfo.is_ban){
      return this.fail(httpErrorCode.USER_BANED.code, httpErrorCode.USER_BANED.msg);
    }
    if(userInfo.password != md5(password)){
      return this.fail(httpErrorCode.PASSWORD_ERROR.code, httpErrorCode.PASSWORD_ERROR.msg);
    }

    sessionData.user_id = userInfo.id;
    // 更新登录信息
    let updateInfo = {
      last_login_time: currentTime,
      last_login_ip: clientIp,
      weixin_openid: sessionData.openid,
    }
    if(wxUserInfo){
      // {
      //   avatarUrl: ""
      //   city: ""
      //   country: ""
      //   gender: 0
      //   language: "zh_CN"
      //   nickName: "Fool"
      //   province: ""
      // }
      if(wxUserInfo.nickName && userInfo.nickname != wxUserInfo.nickName){
        updateInfo.nickname = wxUserInfo.nickName
      }
      if(wxUserInfo.avatarUrl && userInfo.avatar != wxUserInfo.avatarUrl){
        updateInfo.avatar = wxUserInfo.avatarUrl
      }
      if(wxUserInfo.gender && userInfo.gender != wxUserInfo.gender){
        updateInfo.gender = wxUserInfo.gender
      }
    }
    await this.model("user")
      .where({
        id: userInfo.id,
      })
      .update(updateInfo);
    const newUserInfo = await this.model("user")
      .field("id,username,nickname, avatar, is_ban")
      .where({
        id: userInfo.id,
      })
      .find();
    // newUserInfo.nickname = Buffer.from(
    //   newUserInfo.nickname,
    //   "base64"
    // ).toString();
    const TokenSerivce = this.service("token", "api");
    const sessionKey = await TokenSerivce.create(sessionData);
    if (think.isEmpty(newUserInfo) || think.isEmpty(sessionKey)) {
      return this.fail("登录失败4");
    }
    return this.success({
      token: sessionKey,
      userInfo: newUserInfo,
      is_new: is_new,
    });
  }
  async logoutAction() {
    return this.success();
  }
};
