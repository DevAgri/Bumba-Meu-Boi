let pg = require('pg');

connPg = () =>
{
    var config = 
    {
        user: 'deviagri',
        database: 'deviagri',
        password: 'deviagri',
        host: 'localhost',
        port: 5432,
        max: 10,
        idleTimeoutMillis: 2000
    };
    
    return new pg.Pool(config);
};

module.exports = () =>
{ 
    return connPg();
};
