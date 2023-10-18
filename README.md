### 海风小店，开源商城（服务端）

- 基于开源项目 NideShop 重建，精简了一些功能的同时完善了一些功能，并重新设计了 UI
- 测试数据来自上述开源项目
- 服务端 api 基于Ｎ ode.js+ThinkJS+MySQL

### 基于海风小店开发上线的小程序

<img width="200" src="https://raw.githubusercontent.com/iamdarcy/hiolabs/master/git-images/mwyx.jpg">

### 视频教程

https://www.bilibili.com/video/av89567916

### 本项目需要配合

微信小程序项目：GitHub: https://github.com/iamdarcy/hioshop-miniprogram
管理后台项目：GitHub: https://github.com/iamdarcy/hioshop-admin

<a target="_blank" href="https://www.aliyun.com/?source=5176.11533457&userCode=zm04niet"><img width="1400" src="https://raw.githubusercontent.com/iamdarcy/hiolabs/master/git-images/aliyun.jpg"></a>
阿里云主机：低至 2 折 <a target="_blank" href="https://www.aliyun.com/?source=5176.11533457&userCode=zm04niet">立即去看看</a>

### 本地开发环境配置

- 克隆项目到本地

```
git clone https://github.com/iamdarcy/hioshop-server
```

- 创建数据库 hiolabsDB 并导入项目根目录下的 hiolabsDB.sql
  推荐使用软件 Navicat 创建和管理数据库，也可以用以下命令创建：

```
CREATE SCHEMA `hiolabsDB` DEFAULT CHARACTER SET utf8mb4 ;
```

> 注意数据库字符编码为 utf8mb4

- 更改数据库配置
  src/common/config/database.js

```
const mysql = require('think-model-mysql');

module.exports = {
    handle: mysql,
    database: 'hiolabsDB',
    prefix: 'hiolabs_',
    encoding: 'utf8mb4',
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '123123', //你的密码
    dateStrings: true
};
```

- 填写微信登录和微信支付配置和其他设置，比如七牛，阿里云快递等等

src/common/config/config.js

```
// default config
module.exports = {
  default_module: 'api',
  weixin: {
    appid: '', // 小程序 appid
    secret: '', // 小程序密钥
    mch_id: '', // 商户帐号ID
    partner_key: '', // 微信支付密钥
    notify_url: '' // 微信异步通知，例：https://www.hiolabs.com/api/pay/notify
  }
};
```

- 安装依赖并启动

```
npm install
npm start
```

如果安装不成功，百度搜索 cnpm，用淘宝源代替，替换后，用 cnpm i 进行安装依赖

启动后，本地访问 http://127.0.0.1:8360/

### 上线需要以下准备工作：

- 一个微信服务公众号
- 阿里云服务器
- 注册小程序
- 完成认证的七牛
- 完成 API 安全设置的微信商户，并绑定好小程序 id（支付）
- 阿里云物流 api
- 备案后的域名
- 如果卖食品，还需要《食品经营许可证》

也不一定用七牛云的服务，可以用本地存储，不过要自己开发上传功能，可以参考项目中的 upload.js

客服使用微信小程序官方提供的客服功能即可

### 功能列表

- 首页：搜索、Banner、公告、分类 Icons、分类商品列表
- 详情页：加入购物车、立即购买、选择规格
- 搜索页：排序
- 分类页：分页加载商品
- 我的页面：订单（待付款，待发货，待收货），足迹，收货地址

### 项目截图

请参考微信小程序项目：https://github.com/iamdarcy/hioshop-miniprogram

### 最近更新

- 新增生成分享图的功能在 src/common/config/config.js 需要设置好已经开通 https 的七牛 bucket 的参数
  `<img width="600" src="https://images.gitee.com/uploads/images/2020/1118/090429_8fc928b0_1794996.jpeg"/>`
- 项目地址服务端： https://github.com/iamdarcy/hioshop-server后台管理：https://github.com/iamdarcy/hioshop-admin微信小程序：https://github.com/iamdarcy/hioshop-miniprogram
- 本项目会持续更新和维护，喜欢别忘了 Star，有问题可通过微信、QQ 群联系我，谢谢您的关注。
- 我的微信号是 lookgxl，加群时回答这个问题即可入群。海风小店小程序商城 1 群 824781955（已满）海风小店小程序商城 2 群 932101372（已满）海风小店小程序商城 3 群 1130172339（已满）海风小店小程序商城 4 群 652317079 `<img width="500" src="https://raw.githubusercontent.com/iamdarcy/hiolabs/master/git-images/contact.jpg"/>`

### 服务相关配置

- 服务默认端口：8360
- Mysql 版本：5.7.43
- Mysql docker-compose 启动配置 hioshop-server/script/docker/mysql/docker-compose.yml
  部署
