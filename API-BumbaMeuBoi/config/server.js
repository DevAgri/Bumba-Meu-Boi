let express = require('express'),
    expressLoad = require('express-load'),
    bodyParser = require('body-parser');

const raizApplication = __dirname.slice(0, __dirname.length - 6);

let application = express();

application.use(bodyParser.json());
application.use(bodyParser.urlencoded({extended: true}));

application.use(express.static(`${raizApplication}app/public`));//configura o diretório de arquivos estaticos

expressLoad(`app/models`, {verbose: false, cwd: `${raizApplication}`})
    .then(`config/dbConnection`, {verbose: false, cwd: `${raizApplication}`})
    .then(`app/controllers`, {verbose: false, cwd: `${raizApplication}`})
    .then(`app/routes`, {verbose: false, cwd: `${raizApplication}`})
    .into(application);

module.exports = application;
