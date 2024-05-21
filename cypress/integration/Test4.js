import AddressPage from "./pageObjects/AddressPage";
import CartPage from "./pageObjects/CartPage";
import HomePage from "./pageObjects/HomePage";
import ProductsPage from "./pageObjects/ProductsPage";

describe("My Fixture Test Suite", () => {
  before(async () => {
    await cy.fixture("example").as("users");
  });
  it("NEW TEST CASE", () => {
    const homePage = new HomePage();
    const productsPage = new ProductsPage();
    const cartPage = new CartPage();
    const addressPage = new AddressPage();
    cy.visit(`${Cypress.env("url")}/angularpractice/`);
    cy.get("@users").then((user) => {
      //   console.log("HIIII");
      homePage.getEditBox().type(user.name);
      homePage.getGender().select(user.gender);
      homePage.getTwoWayDataBinding().should("have.value", user.name);
      homePage.getEditBox().should("have.attr", "minlength", "2");
      homePage.getEnterpreneurRadioButton().should("be.disabled");
      // cy.pause()
      homePage.getShopTab().click();

      //   cy.addProduct("Blackberry")
      //   cy.addProduct("Nokia Edge")
      user.products.forEach((el) => cy.addProduct(el));
      productsPage.checkOutButton().click();
      var total = 0;
      cartPage
        .eachProductPrice()
        .each(($ele) => {
          const word = $ele.text().trim();
          cy.log(word.slice(2, word.length));
          total += Number(word.slice(2, word.length));
        })
        .then(() => {
          cartPage.totalProductPrice().should("have.text", "₹. " + total);
        });

      cartPage.checkOutButton().click();
      addressPage.countrySelect().type("India");
      cy.wait(3000);

      addressPage.countrySuggestionList().click();
      addressPage.checkBox().click({ force: true });
      addressPage.submitButton().click();
      addressPage.alert().should("contain.text", "Success!");
    });
  });

  after(()=>{
    
  })
});
// it("Property Validations",() => {
//     cy.visit("https://rahulshettyacademy.com/angularpractice/")

// })
