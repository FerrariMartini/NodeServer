var mysql = require('mysql');

var connMySQL = function(){
    return connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'ap420069',
        database: 'portal_noticias'
    });
};

module.exports = function(){
    return connMySQL;
};