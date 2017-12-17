module.exports = (application) =>
{
    application.get("/teste", (request, response) =>
    {
        console.log(request.query.msg);
        response.send(JSON.stringify({msg: "Mensagem: "+request.query.msg}));
    });
    application.get("/animais", (request, response) =>
    {
        application.app.controllers.animais.recuperar(application, request, response);
    });
    application.get("/animais/relatorios", (request, response) =>
    {
        application.app.controllers.animais.relatorios(application, request, response);
    });
    application.post("/animais", (request, response) =>
    {
        application.app.controllers.animais.inserir(application, request, response);
    });
};
