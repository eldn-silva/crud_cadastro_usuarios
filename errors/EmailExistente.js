class EmailExistente extends Error {
    constructor() {
        super('O e-mail fornecido já está cadastrado em nossa base de dados. Favor, verificar')
        this.name = 'EmailExistente'
    }
}

module.exports = EmailExistente;