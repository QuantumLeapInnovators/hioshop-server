module.exports = class extends think.Controller {
	async __before() {
		// 根据token值获取用户id
		const token = this.ctx.header['x-hioshop-token'] || '';
		const tokenSerivce = think.service('token', 'api');
		think.userId = tokenSerivce.getUserId(token);
	}
	/**
	 * 获取时间戳
	 * @returns {Number}
	 */
	getTime() {
		return parseInt(Date.now() / 1000);
	}
	/**
	 * 获取当前登录用户的id
	 * @returns {*}
	 */
	getLoginUserId() {
		const token = this.ctx.header['x-hioshop-token'] || '';
		const tokenSerivce = think.service('token', 'api');
		return tokenSerivce.getUserId(token);
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
	 
//     /**
//    * Bad Request 
//    * @return {Promise} []
//    */
//     _400Action(){
//         return this.displayErrorPage(400);
//       }

  /**
   * Internal Server Error
   * @return {Promise}      []
   */
  _500Action(){
    console.info("throw 500 response 400")
     return this.fail(500, '未知错误');
  }

};
