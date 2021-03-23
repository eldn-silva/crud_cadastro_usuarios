const { Router } = require('express');
const { Administrator } = require('../models');
const router = Router();
const CampoInvalido = require('../errors/CampoInvalido');
const NaoEncontrado = require('../errors/NaoEncontrado');
const EmailExistente = require('../errors/EmailExistente');

router.get('/', async(req, res, next) => {
    try {
        const administrators = await Administrator.findAll();
        if (administrators.length == 0) {
            throw new NaoEncontrado();
        }
        res.status(200).json(administrators);
    } catch (error) {
        next(error);
    }   
});


module.exports = router;