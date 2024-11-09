class Url {
    urls = {
        PRODUTOS: 'products',
        LOGIN: 'login'
    }

    validarUrl(url){
        cy.url().should('contain', url)
    }
}

export default new Url()