///   <reference types="cypress" />

import cadastro from '../pages/cadastro'
import login from '../pages/login'  
import menu from '../pages/menu'
import url from '../pages/url'
import produto from '../pages/produto'
import { faker } from '@faker-js/faker'


describe('Automation Exercise', () => {
   beforeEach(() => {
    cy.visit('/')
   });

    it('Test Case 1: Register User', () => {
        menu.irPara(menu.menus.LOGIN)

        cadastro.preencherFormulario()
        cadastro.verificarSeCadastroFoiConcluido()
           
    });

    it('Test Case 2: Login User with corret email and password ', () => {
        menu.irPara(menu.menus.LOGIN)

        login.preencherLogin('tester-g123@mail.com', '12345')

        login.verificarSeLogou('Teste QA')
        
    });

    it('Test Case 3: Login User with incorret email and password ', () => {
        menu.irPara(menu.menus.LOGIN)

        login.preencherLogin('tester-g12fdsfafda3@mail.com', '54321')

        login.verificarSeNaoLogou()
        
    });

    it('Test Case 4: Logout User ', () => {
        menu.irPara(menu.menus.LOGIN)

        login.preencherLogin('tester-g123@mail.com', '12345')

        login.verificarSeLogou('Teste QA')
 
        menu.irPara(menu.menus.DESLOGAR)

        url.validarUrl(url.urls.LOGIN)

        login.validarLogout()
        
    });

    it('Test Case 5: Register User with existing email', () => {
        menu.irPara(menu.menus.LOGIN)

        cadastro.iniciarCadastro(`tester-g123@mail.com`)

        cadastro.validarEmailJaCadastrado()
        
    });

    it('Test Case 6: Contact Us Form', () => {
        menu.irPara(menu.menus.CONTATO)
        
        cy.get('[data-qa="name"]').type(`Tester`)
        cy.get('[data-qa="email"]').type(`tester-gqa@mail.com`)
        cy.get('[data-qa="subject"]').type(`Test Automation`)
        cy.get('[data-qa="message"]').type(`Learning Test Automation`)

        cy.fixture('example.json').as('arquivo')
        
        cy.get('input[name="upload_file"]').selectFile('@arquivo')

        cy.get('[data-qa="submit-button"]').click()

        cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')


    });

    it('Test Case 8: Verify All Products and product detail page ', () => {
        menu.irPara(menu.menus.PRODUTOS)

        url.validarUrl(url.urls.PRODUTOS)
        cy.get('.title').should('be.visible').and('contain', 'All Products')

        cy.get('.single-products')
            .should('be.visible')
            .and('have.length.least', 1)
            .first()
            .parent()
            .contains('View Product')
            .click()
        
        cy.get('.product-information > h2').should('be.visible')
        cy.get('.product-information p').should('be.visible').and('have.length', 4)
        cy.get('.product-information span span').should('be.visible')

    });

    it('Test Case 9: Search Product', () => {
        menu.irPara(menu.menus.PRODUTOS)

        url.validarUrl(url.urls.PRODUTOS)
        produto.validarTexto('All Products')
        

        cy.get('input#search_product').type('Shirt')
        cy.get('button#submit_search').click()

        produto.validarTexto('Searched Products')

        cy.get('.single-products')
            .should('be.visible')
            .and('have.length.at.least', 1)
                   
    });

    it('Test Case 10: Verify Subscription in home page', () => {       
        cy.get('input#susbscribe_email') 
            .scrollIntoView()
            .type('tester-gqa@mail.com')
        
        cy.get('button#subscribe').click()
        
        cy.contains('You have been successfully subscribed!').should('be.visible')
    });

    it('Test Case 15: Place Order: Register before Checkout', () => {
        menu.irPara(menu.menus.LOGIN)
        cadastro.preencherFormulario()

        cy.contains("Add to cart").click()
        cy.contains("View Cart").click()
        cy.get('.btn-default.check_out').should('be.visible')
        cy.get('.btn-default.check_out').click()
        cy.get('.heading').first().should('have.text', 'Address Details')
        cy.get('.heading').last().should('have.text', 'Review Your Order')
        cy.get('.form-control').type('378 98562-8781')
        cy.get('.btn-default.check_out').click()
        cy.get('[data-qa="name-on-card"]').type(faker.person.fullName())
        cy.get('[data-qa="card-number"]').type(faker.finance.creditCardNumber())
        cy.get('[data-qa="cvc"]').type(faker.finance.creditCardCVV())
        cy.get('[data-qa="expiry-month"]').type(12)
        cy.get('[data-qa="expiry-year"]').type(2035)
        cy.get('[data-qa="pay-button"]').click()

        cy.get('[data-qa="order-placed"]').should('be.visible')

        cy.get('[href *="delete"]').click()

        cy.get('b').should('contain', 'Account Deleted!')

        cy.get('[data-qa="continue-button"]').click()    

    });
});
