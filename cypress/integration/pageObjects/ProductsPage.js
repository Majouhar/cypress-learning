class ProductsPage{
    getProductTitle(){
        return cy.get("h4.card-title")
    }
    getAddtoCartButton(){
        return  cy.get(".card .btn")
    }
    checkOutButton(){
        return cy.get('#navbarResponsive > .navbar-nav > .nav-item > .nav-link')
    }
    
}

export default ProductsPage