class Produto {

    validarTexto(texto) {
        cy.get('.title').should('be.visible').and('contain', texto)

    }
}

export default new Produto()