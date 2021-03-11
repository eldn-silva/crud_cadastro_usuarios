const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/teste', (req, res) => {
    res.send('rota GET teste está ok!!');
})

app.listen(3000, () => {
    console.log('servidor rodando na porta 3000')
});