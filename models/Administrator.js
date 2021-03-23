const Administrator = (sequelize, DataTypes) => {
    return sequelize.define('Administrator', {
        email: DataTypes.STRING,
        senha: DataTypes.STRING
    });
}

module.exports = Administrator;