class AddressPage{
    countrySelect(){
        return cy.get('#country')
    }
    countrySuggestionList(){
        return cy.get('.suggestions > ul > li > a')
    }

    checkBox(){
        return cy.get("#checkbox2")
    }

    submitButton(){
        return cy.get("input[type='submit']")
    }
    alert(){
        return cy.get(".alert")
    }
}

export default AddressPage