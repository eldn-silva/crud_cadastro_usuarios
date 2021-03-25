const { Router } = require('express');
const { User } = require('../models');
const router = Router();
const CampoInvalido = require('../errors/CampoInvalido');
const NaoEncontrado = require('../errors/NaoEncontrado');
const EmailExistente = require('../errors/EmailExistente');
const login = require('../middleware/login');

router.get('/', login.obrigatorio, async(req, res, next) => {
    try {
        const users = await User.findAll();
        if (users.length == 0) {
            throw new NaoEncontrado();
        }
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
    
});

router.get('/:id', login.obrigatorio, async(req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user == null) {
            throw new NaoEncontrado(); 
        }
        res.status(200).json(user);

    } catch (error) {
        next(error);
    }
});

router.post('/', login.obrigatorio, async(req, res, next) => {
    try {
        const { name, email } = req.body;
        
        if (typeof req.body.name !== 'string' || typeof req.body.email !== 'string' || req.body.name.length == 0 || req.body.email.length == 0) {
            throw new CampoInvalido();
        }

        let userDb = await User.findAll({ where: { "email": req.body.email }})
        if (userDb.length > 0) {
            throw new EmailExistente();
        }

        User.create({ name, email });
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!! '})
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', login.obrigatorio, async(req, res, next) => {
    try {
        let userDb = await User.findAll({ where: { "id": req.params.id }})
        if (userDb.length == 0) {
            throw new NaoEncontrado();
        }

        await User.destroy({
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
        const { name, email } = req.body;
        // validação de id inexistente
        const user = await User.findByPk(req.params.id);
        if (user == null) {
            throw new NaoEncontrado();
        }
        // validação de campos inválidos
        if (typeof req.body.name !== 'string' || typeof req.body.email !== 'string' || req.body.name.length == 0 || req.body.email.length == 0) {
            throw new CampoInvalido();
        }
        // validação de e-mail já cadastrado
        let userDb = await User.findAll({ where: { "email": req.body.email }})
        if (userDb.length > 0) {
            throw new EmailExistente();
        }

        await User.update(
            { name, email },
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