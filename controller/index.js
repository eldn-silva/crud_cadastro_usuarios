const usersController = require('./usersController');
const admController = require('./admController')

module.exports = {
    users: usersController,
    administrators: admController
};