class Menu {
    menus = {
        PRODUTOS: 'Products',
        LOGIN: 'Signup',
        DESLOGAR: 'Logout'
    }
    irParaProdutos() {
        cy.contains(`Products`).click()
    }

    irParaLoginCadastro() {
        cy.contains('Signup').click()
    }

    irPara(menu){
        cy.contains(menu).click()
    }
}

export default new Menu()




