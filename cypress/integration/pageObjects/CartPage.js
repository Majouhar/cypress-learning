class CartPage{
    checkOutButton(){
        return cy.contains("Checkout")
    }
    eachProductPrice(){
        return cy.get('tbody tr td:nth-child(4) strong')
    }
    totalProductPrice(){
        return cy.get('tbody tr td:nth-child(5) strong')
    }
}
export default CartPage