class Cadastro {
    preencherFormulario() {
        const timestamp = new Date().getTime()
        const signUpName = 'Tester QA'

        Cypress.env('signUpName', signUpName)


        cy.get('[data-qa="signup-name"]').type(Cypress.env('signUpName'))
        cy.get('[data-qa="signup-email"]').type(`tester-${timestamp}@mail.com`)
        cy.contains('button', 'Signup').click()


        // radio ou checkboxes -> check
        //cy.get('#id_gender2').check()
        cy.get('input[type=radio]').check('Mrs')
        //cy.get('input[type=radio]').first().check()
        //cy.get('input[type=radio]').last().check()
        //cy.get('input[type=radio]').eq(1)   // 0, 1, 2

        cy.get('[type=password]').type('12345', { log: false})

        cy.get('[data-qa="days"]').select('5')


        // cy.get('[data-qa="months"]').select('1')
        cy.get('[data-qa="months"]').select('November')
        cy.get('[data-qa="years"]').select('1993')


        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()
      

        cy.get('[data-qa="first_name"]').type('Maeve')
        cy.get('[data-qa="last_name"]').type('Lacoster')
        cy.get('[data-qa="company"]').type('UCLA')
        cy.get('[data-qa="address"]').type('Rua Estados Unidos')
        cy.get('[data-qa="country"]').select('United States')
        cy.get('[data-qa="state"]').type('Califórnia')
        cy.get('[data-qa="city"]').type('Los Angeles')
        cy.get('[data-qa="zipcode"]').type('90001')
        cy.get('[data-qa="mobile_number"]').type('111 222 333')


        cy.get('[data-qa="create-account"]').click()

        cy.url().should('includes', 'account_created')

        cy.get('[data-qa="account-created"]').should('be.visible')

        cy.get('[data-qa="continue-button"]').click()

        return this
    }

    iniciarCadastro(usuario) {
        cy.get('[data-qa="signup-name"]').type('Tester QA')
        cy.get('[data-qa="signup-email"]').type(usuario)
        cy.contains('button', 'Signup').click()

        return this
    }

    verificarSeCadastroFoiConcluido() {
        cy.get('i.fa-user').parent().should('contain', Cypress.env('signUpName'))

        return this

    }

}

export default new Cadastro()