class Login {
    preencherLogin(usuario, senha) {
        cy.get('[data-qa="login-email"]').type(usuario)
        cy.get('[data-qa="login-password"]').type(senha, { log: false })

        cy.get('[data-qa="login-button"]').click()
    }

    verificarSeLogou(nome) {
        cy.get('i.fa-user').parent().should('contain', nome)

    }

    verificarSeNaoLogou() {
        cy.get(`.login-form form p`).should('contain', 'Your email or password is incorrect!')
    }

    validarLogout() {
        cy.contains("Login to your account").should("be.visible")
    }
}

export default new Login()