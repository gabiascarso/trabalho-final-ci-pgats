class Menu {
    menus = {
        PRODUTOS: 'Products',
        LOGIN: 'Signup',
        DESLOGAR: 'Logout',
        CONTATO: 'Contact us'
    }

    irPara(menu){
        cy.contains(menu).click()
    }
}

export default new Menu()





