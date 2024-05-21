const neatCSV = require("neat-csv");
let productName;
describe("My HTTP Test", () => {
  // https://rahulshettyacademy.com/seleniumPractise/#/
  it("First Test", () => {
    cy.visit("https://rahulshettyacademy.com/angularAppdemo");
    cy.intercept(
      {
        method: "GET",
        url: "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty",
      },
      {
        statusCode: 200,
        body: [
          {
            book_name: "RestAssured with Java",
            isbn: "BSG",
            aisle: "2302",
          },
          {
            book_name: "RestAssured with Java",
            isbn: "BSG",
            aisle: "2302",
          },
          {
            book_name: "RestAssured with Java",
            isbn: "BSG",
            aisle: "2302",
          },
          {
            book_name: "RestAssured with Java",
            isbn: "BSG",
            aisle: "2302",
          },
          {
            book_name: "RestAssured with Java",
            isbn: "BSG",
            aisle: "2302",
          },
        ],
      }
    ).as("getBooks");
    cy.get("button.btn-primary").click();
    cy.wait("@getBooks").then(({ request, response }) => {
      cy.get("tr").should("have.length", response.body.length + 1);
    });
    // cy.get('p').should("have.text","Oops only 1 Book available")
  });
  it("Second Test", () => {
    cy.visit("https://rahulshettyacademy.com/angularAppdemo");
    cy.intercept(
      "GET",
      "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty",
      (req) => {
        req.url =
          "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra";
        req.continue((res) => {
          expect(res.statusCode).equal(200);
        });
      }
    ).as("getBooksWithError");
    cy.get("button.btn-primary").click();
    cy.wait("@getBooksWithError");
    // cy.wait("@getBooksWithError").then(({ request, response }) => {
    //   //   cy.get("tr").should("have.length", response.body.length + 1);
    // });
    // cy.get('p').should("have.text","Oops only 1 Book available")
  });

  it("Non Recommended API Testing", () => {
    cy.request("POST", "http://216.10.245.166./Library/Addbook.php", {
      name: "Lean Appium Automation With Java",
      isbn: "bcdss",
      aisle: "22s7",
      author: "John Foe",
    }).then((response) => {
      expect(response.body).to.have.property("Msg", "successfully added");
    });
  });

  it("JWT Token ", () => {
    cy.LoginAPI().then(() => {
      cy.visit("https://rahulshettyacademy.com/client", {
        onBeforeLoad: (window) => {
          window.localStorage.setItem("token", Cypress.env("token"));
        },
      });
      cy.get(".card-body b")
        .eq(1)
        .then((ele) => {
          productName = ele.text();
        });
      cy.get(".card-body button:last-of-type").eq(1).click();
      cy.get("[routerlink*='cart']").click();
      cy.contains("Checkout").click();
      cy.get("[placeholder*='Country']").type("ind");
      cy.get(".ta-results button").each(($el, index, $list) => {
        if ($el.text() == " India") {
          cy.wrap($el).click();
        }
      });
      cy.get(".action__submit").click();
      cy.wait(2000);

      cy.get(".order-summary button:first-child").eq(1).click();
      cy.readFile(
        Cypress.config("fileServerFolder") +
          "/cypress/downloads/order-invoice_test43.csv"
      ).then(async (text) => {
        const csv = await neatCSV(text);
        expect(csv[0]["Product Name"]).equal(productName);
      });
    });
  });
});
