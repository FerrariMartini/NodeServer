module.exports.indexxx = function (application, req, res) {

    //estamos pegando o módulo de conexão com o banco para usá-los para iniciar
    // uma nova conexão.
    var connection = application.config.dbConnection();

    //estamos instanciando o DAO para usar os métodos dessa classe
    var noticiasModel = new application.app.models.NoticiasDAO(connection);

    // O callback de uma query SQL espera 2 parametros, o erro e resultado.
    noticiasModel.getFiveLastNews(function (error, result) {
        res.render('home/index', {lastNews: result})
    })
};