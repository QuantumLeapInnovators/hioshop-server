module.exports = class extends think.Controller {
  async __before() {
    // 根据token值获取用户id
    think.token = this.ctx.header['x-hioshop-token'] || '';
    const tokenSerivce = think.service('token', 'admin');
    think.userId = await tokenSerivce.getUserId();
    // 只允许登录操作
    if (this.ctx.controller != 'auth') {
      if (think.userId <= 0 || think.userId == undefined) {
        return this.fail(401, '请先登录');
      }
    }
  }

   /**
   * display error page
   * @param  {Number} status []
   * @return {Promise}        []
   */
   displayErrorPage(status){
    let module = 'common';
    if(think.mode !== think.mode_module){
      module = this.config('default_module');
    }
    let file = `${module}/error/${status}.html`;
    let options = this.config('tpl');
    options = think.extend({}, options, {type: 'ejs'});
    return this.display(file, options);
  }

  
};