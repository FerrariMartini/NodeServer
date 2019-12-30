// Nas rotas, iremos deixar apenas as requisições que serão realizadas, e ficará
// a cargo dos controllers processar as regras de negócio.
module.exports.formulario_inclusao_noticias = function (application, req, res) {
    res.render('admin/form_add_noticia', {valida: {}, noticia: {}});
};


module.exports.noticia_salvar = function (application, req, res) {
    //RECUPEANDO OS DADOS VINDOS PELO REQUEST/MÉTODO POST.
    var noticia = req.body;
//  Estamos usando o "express-validator": "^3.2.1", que permite usar os métodos abaixo para validar
    // os dados que estão vindo do formulário para o servidor antes de grava-los no banco.
    // usamos o método assert + o atributo NAME do input do html para recuperar o dados. O segundo parametro é a mensagem que iremos exibir para o usuário
    // e o método ao final é o tipo de validação que está sendo realizada.
    req.assert('titulo', 'Titulo Campo Obrigatório').notEmpty();
    req.assert('resumo', 'Campo Obrigatório').notEmpty();
    req.assert('resumo', 'O Resumo deve ter entre 2 e 10 caracteres').len(2, 10);
    req.assert('autor', 'Campo Obrigatório').notEmpty();
    req.assert('data_noticia', 'Campo Obrigatório').notEmpty().isDate('YYYY-MM-DD');
    req.assert('noticia', 'A Notícia é campo Obrigatório').notEmpty();

    // o validationErros irá verificar se há erros no asserts e irá retornar um boolean.
    var errado = req.validationErrors();

    if (errado) {
        // estou enviando para o HTML via RESPONSE e RENDER a variável VALIDA que
        // será usada para recuperar os textos inseridos no asserts
        res.render('admin/form_add_noticia', {valida: errado, noticia: noticia});
        // ao deixar o return vazio não iremos prosseguir com o código
        return;
    }

    // INSTANCIANDO A CLASSE/MODULO CONNECTION
    var connection = application.config.dbConnection();

    // INSTANCIANDO A CLASSE/MODULO DAO
    var noticiasModel = new application.app.models.NoticiasDAO(connection);

    // CHAMANDO O MÉTODO SALVAR_NOTICIAS do DAO que irá efetuar as tratativas com o DB.
    noticiasModel.salvarNoticia(noticia, function (error, result) {
        //REDIRECIONANDO
        res.redirect('/noticias');
    });

}