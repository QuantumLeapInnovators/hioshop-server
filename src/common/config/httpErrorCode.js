/**
 * error code
 */
module.exports = {
    // user 10010-10020
    "USER_NOT_FOUND":{
        code:10010,
        msg:"用户不存在"
    },
    "DUPLICATE_USERNAME":{
        code:10011,
        msg:"用户名已存在"
    },
    "PASSWORD_ERROR":{
        code:10012,
        msg:"密码错误"
    },
    "USER_BANED":{
        code:10013,
        msg:"用户未激活"
    }
}