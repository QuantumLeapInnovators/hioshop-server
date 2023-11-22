const mysql = require('think-model-mysql');

module.exports = {
    handle: mysql,
    database: 'hiolabsDB',
    prefix: 'hiolabs_',
    encoding: 'utf8mb4',
    host: '192.168.50.129',
    port: '3306',
    user: 'root',
    password: '123456',
    dateStrings: true,
    charset: 'utf8mb4'
};
