class NaoEncontrado extends Error {
    constructor() {
        super('Não encontrado. Favor, verificar.')
        this.name = 'NaoEncontrado'
    }
}

module.exports = NaoEncontrado;