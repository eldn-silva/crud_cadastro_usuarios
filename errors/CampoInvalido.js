class CampoInvalido extends Error {
    constructor() {
        const mensagem = 'Existem campos inválidos'
        super(mensagem)
        this.name = 'campoInvalido'
    }
}

module.exports = CampoInvalido