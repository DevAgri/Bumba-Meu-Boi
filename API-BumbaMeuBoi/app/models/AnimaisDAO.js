class AnimaisDAO
{
    constructor(connection)
    {
        this._pool = connection;
    }

    buscarAnimal(dados, callback)
    {
        const text = `SELECT * FROM animais WHERE identificacao ILIKE '${dados.txConsulta}' LIMIT ${dados.limit} OFFSET ${dados.offset};\n`+
                     `SELECT COUNT(id) FROM animais WHERE identificacao ILIKE '${dados.txConsulta}';`;

        //console.log(text);
        this._pool.query(text, callback);
    }

    consultarRelatorios(callback)
    {
        let text = `SELECT categorias.descricao AS descricao, count(animais.id) AS dado FROM categorias `+
                    `INNER JOIN animais ON animais.categoria = categorias.id GROUP BY categorias.descricao;`;
        
        //console.log(text);
        this._pool.query(text, callback);
    }

    inserirAnimal(dados, callback)
    {
        const text = `INSERT INTO
                        animais (identificacao, peso, origem, categoria${dados.pai? ", pai": ""} `+
                        `${dados.mae? ", mae": ""})
                    VALUES
                        ('${dados.identificacao}', '${dados.peso}', '${dados.origem}', ${dados.categoria} `+
                        `${dados.pai ? (", \'"+dados.pai+"\'"): ""}${dados.mae ? (", \'"+dados.mae)+"\'" : ""});`;

        //console.log(text);
        this._pool.query(text, callback);
    }
}

module.exports = () => AnimaisDAO;