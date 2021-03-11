const { Router } = require('express');
const { User } = require('../models');

const router = Router();

router.get('/', async(req, res) => {
    const users = await User.findAll();
    res.status(200).json(users);
});

router.get('/:id', async(req, res) => {
    const user = await User.findByPk(req.params.id);
    res.status(200).json(user);
});

router.post('/', async(req, res) => {
    const { name, email } = req.body;
    const newUser = User.create({ name, email });

    res.status(200).json({ message: 'Usuário cadastrado com sucesso!! '})
});

router.delete('/:id', async(req, res) => {
    await User.destroy({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({ message: 'Usuário excluído com sucesso!! '})
})

router.put('/:id', async(req, res) => {
    const { name, email } = req.body;

    await User.update(
        { name, email },
        {
            where: { id: req.params.id }
        }
    )

    res.status(200).json({ message: 'Usuário atualizado com sucesso!!' })
})


module.exports = router;