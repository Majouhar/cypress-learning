import {
  Given,
  When,
  Then,
  Before,
} from "@badeball/cypress-cucumber-preprocessor";
import HomePage from "../../pageObjects/HomePage";
import ProductsPage from "../../pageObjects/ProductsPage";
import CartPage from "../../pageObjects/CartPage";
import AddressPage from "../../pageObjects/AddressPage";

const homePage = new HomePage();
const productsPage = new ProductsPage();
const cartPage = new CartPage();
const addressPage = new AddressPage();
let name;

Before(() => {
  cy.fixture("example").as("users");
});

Given("I Open Ecommerce Page", () => {
  cy.visit(`${Cypress.env("url")}/angularpractice/`);
});

When("I add Items to Cart", (dataTable) => {
  // cy.get("@users").then((user) => {
  //   homePage.getShopTab().click();
  //   user.products.forEach((el) => cy.addProduct(el));
  //   productsPage.checkOutButton().click();
  // });
  homePage.getShopTab().click();
  const arr = JSON.parse(dataTable.rawTable[1][0]);
  arr.forEach((el) => cy.addProduct(el));
  productsPage.checkOutButton().click();
});

When("Validate the total Prices", () => {
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
});

Then("Select the Country submit and Verify Success", () => {
  cartPage.checkOutButton().click();
  addressPage.countrySelect().type("India");
  cy.wait(3000);

  addressPage.countrySuggestionList().click();
  addressPage.checkBox().click({ force: true });
  addressPage.submitButton().click();
  addressPage.alert().should("contain.text", "Success!");
});

When("I fill the Form Details", (dataTable) => {
  //   cy.get("@users").then((user) => {
  //     homePage.getEditBox().type(user.name);
  //     homePage.getGender().select(user.gender);
  //   });
  name = dataTable.rawTable[1][0];
  homePage.getEditBox().type(name);
  homePage.getGender().select(dataTable.rawTable[1][1]);
});

Then("Validate the forms behaviour", (dataTable) => {
  homePage.getTwoWayDataBinding().should("have.value", name);
  homePage.getEditBox().should("have.attr", "minlength", "2");
  homePage.getEnterpreneurRadioButton().should("be.disabled");
});
Then("Select the Shop Page", () => {
  homePage.getShopTab().click();
});
