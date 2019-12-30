module.exports = function (application) {
    //ATRIBUINDO AO GET O QUE ELE DEVE EXIBIR PARA O USUÁRIO
    application.get('/formulario_inclusao_noticia', function (req, res) {
        application.app.controllers.admin.formulario_inclusao_noticias(application, req, res);
    });

    application.post('/noticias/salvar', function (req, res) {
        application.app.controllers.admin.noticia_salvar(application, req, res);

    });
}