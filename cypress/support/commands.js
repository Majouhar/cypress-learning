// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//

import ProductsPage from "../integration/pageObjects/ProductsPage";

//
Cypress.Commands.add("addProduct", (productName) => {
  const productsPage = new ProductsPage();
  productsPage.getProductTitle().each(($ele, index) => {
    if ($ele.text().includes(productName)) {
      productsPage.getAddtoCartButton().eq(index).click();
    }
  });
});

Cypress.Commands.add("LoginAPI", () => {
  cy.request("POST", "https://rahulshettyacademy.com/api/ecom/auth/login", {
    userEmail: "test43@yahoo.com",
    userPassword: "Abay@123",
  }).then((response) => {
    expect(response.status).to.eq(200);
    Cypress.env("token", response.body.token);
  });
});

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
