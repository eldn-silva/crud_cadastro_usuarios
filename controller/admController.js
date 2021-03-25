const { Router } = require('express');
const { Administrator } = require('../models');
const router = Router();
const CampoInvalido = require('../errors/CampoInvalido');
const NaoEncontrado = require('../errors/NaoEncontrado');
const EmailExistente = require('../errors/EmailExistente');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const login = require('../middleware/login');

router.get('/', login.obrigatorio, async(req, res, next) => {
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

//criar usuário
router.post('/cadastro', async(req, res, next) => {
    try {
        const email = req.body.email;
        const senha = await bcrypt.hashSync(req.body.senha, 10); //criptografando a senha
        
        if (typeof req.body.email !== 'string' || typeof req.body.senha !== 'string' || req.body.senha.length == 0 || req.body.email.length == 0) {
            throw new CampoInvalido();
        }

        let userDb = await Administrator.findAll({ where: { "email": req.body.email }})
        if (userDb.length > 0) {
            throw new EmailExistente();
        }

        Administrator.create({ email, senha });
        res.status(201).json({ message: 'Administrador cadastrado com sucesso!! ',
        admCriado: {
            email: req.body.email
        }
    })
    } catch (error) {
        next(error);
    }
})

// login usuário
router.post('/login', async(req, res, next) => {
    try{
        let administrator = await Administrator.findAll({ where: { "email": req.body.email }})
        
        if (administrator.length < 1) {
            throw new NaoEncontrado();
        }

        if (await bcrypt.compareSync(req.body.senha, administrator[0].senha)) {//comparando as senhas
            const token = jwt.sign({
                id: administrator[0].id,
                email: administrator[0].email
            },
            process.env.JWT_KEY);
            return res.status(200).send({
                mensagem: 'Autenticado com sucesso',
                token: token
            })
        }

        return res.status(400).send({ message: 'Falha na autenticação '})

    } catch(error) {
        next(error)
    }
})

router.delete('/:id', login.obrigatorio, async(req, res, next) => {
    try {
        let userDb = await Administrator.findAll({ where: { "id": req.params.id }})
        if (userDb.length == 0) {
            throw new NaoEncontrado();
        }

        await Administrator.destroy({
            where: {
                id: req.params.id
            }
        })

        res.status(200).json({ message: 'Usuário excluído com sucesso!! '})
    
    } catch (error) {
        next (error)
    }
})

router.put('/:id', login.obrigatorio, async(req, res, next) => {
    try {
        const email = req.body.email;
        const senha = await bcrypt.hashSync(req.body.senha, 10); //criptografando a senha
        
        if (typeof req.body.email !== 'string' || typeof req.body.senha !== 'string' || req.body.senha.length == 0 || req.body.email.length == 0) {
            throw new CampoInvalido();
        }

        let userDb = await Administrator.findAll({ where: { "email": req.body.email }})
        if (userDb.length > 0) {
            throw new EmailExistente();
        }

        await Administrator.update(
            { email, senha },
            {
                where: { id: req.params.id }
            }
        )

    res.status(200).json({ message: 'Usuário atualizado com sucesso!!' })

    } catch (error) {
        next(error);
    }
    
})

module.exports = router;