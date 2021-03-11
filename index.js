const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const controllers = require('./controller')

app.use(bodyParser.json());

app.use('/users', controllers.users);

app.listen(3000, () => {
    console.log('servidor rodando na porta 3000')
});