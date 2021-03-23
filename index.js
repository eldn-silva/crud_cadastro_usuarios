require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const controllers = require('./controller')
const NaoEncontrado = require('./errors/NaoEncontrado');
const CampoInvalido = require('./errors/CampoInvalido');
const EmailExistente = require('./errors/EmailExistente');
const morgan = require('morgan');

app.use(morgan('dev'));

app.use(bodyParser.json());

app.use('/users', controllers.users);
app.use('/administrators', controllers.administrators);

app.use((erro, req, res, next) => {
    let status = 500

    if (erro instanceof NaoEncontrado) {
        status = 404
    }

    if (erro instanceof CampoInvalido) {
        status = 400
    }

    if (erro instanceof EmailExistente) {
        status = 422
    }

    res.status(status).json({
        mensagem: erro.message
    })
    
})

app.listen(3000);

module.exports = app;