module.exports.recuperar = (application, request, response) =>
{
    const dadosURLEncoded =
    {
        txConsulta: typeof(request.query.txconsulta) === "undefined" ? "%" : `%${request.query.txConsulta}%`,        
        order: request.query.order,
        limit: request.query.limit,
        offset: request.query.offset,
    };

    const connection = application.config.dbConnection;
    const AnimaisDAO = new application.app.models.AnimaisDAO(connection);

    const callback = (error, results) =>
    {
        if (typeof(error) !== "undefined")
        {
            response.send({status: 'alert', title: 'Erro!', msg: 'Erro no servidor.'});
            console.log('Erro: na recuperação dos objetos', error);
        } else
        {
            response.send(JSON.stringify(
                    {
                        total: results[1].rows[0].count,
                        rows: results[0].rows
                    }
            ));
        }
    };
    
    AnimaisDAO.buscarAnimal(
        {
            txConsulta: dadosURLEncoded.txConsulta,
            offset: dadosURLEncoded.offset,
            limit: dadosURLEncoded.limit
        },
        callback
    );
}

module.exports.inserir = (application, request, response) =>
{
    const dadosPost =
    {
        identificacao: request.body.identificacao,
        peso: request.body.peso,
        origem: request.body.origem,
        pai: typeof(request.body.pai) === 'undefined' ? false : request.body.pai,
        mae: typeof(request.body.mae) === 'undefined' ? false : request.body.mae,
        categoria: parseInt(request.body.categoria)
    };

    const connection = application.config.dbConnection;
    const AnimaisDAO = new application.app.models.AnimaisDAO(connection);

    const callbackCadastroAnimal = (error, results) =>
    {
        if (typeof(error) !== "undefined")
        {
            response.send({status: 'alert', title: 'Erro!', msg: 'Erro no servidor.'});
            console.log('Erro: no cadastro do animal, seu animal:', error);
        } else
        {
            response.send({status: "success", title: "Cadastro de boi!", msg: "Cadastro efetuado com sucesso."})
        }
    };
    
    AnimaisDAO.inserirAnimal(
        {
            identificacao: dadosPost.identificacao,
            peso: dadosPost.peso,
            origem: dadosPost.origem,
            pai: dadosPost.pai,
            mae: dadosPost.mae,
            categoria: dadosPost.categoria
        },
        callbackCadastroAnimal
    );
}

module.exports.relatorios = (application, request, response) =>
{
    const connection = application.config.dbConnection;
    const AnimaisDAO = new application.app.models.AnimaisDAO(connection);

    const callbackConsultaRelatorios = (error, results) =>
    {
        if (typeof(error) !== "undefined")
        {
            response.send({status: 'alert', title: 'Erro!', msg: 'Erro no servidor.'});
            console.log('Erro: na consulta das categorias e geneticas, seu animal:', error);
        } else
        {
            response.send(JSON.stringify(results.rows));
        }
    };

    AnimaisDAO.consultarRelatorios(callbackConsultaRelatorios);
}