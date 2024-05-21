describe("My First Test", () => {
  // https://rahulshettyacademy.com/seleniumPractise/#/
  it("First Test", () => {
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
    cy.get(".search-keyword").type("ca");
    cy.wait(1000);
    cy.get(".product:visible").should("have.length", 4);
    // cy.get(".products").find(".product-image").find("img").should("have.length", 4);
    const ele = cy.get(".products");
    ele.find(".product").each(($ele, index, $list) => {
      const textVeg = $ele.find("h4.product-name").text();
      if (textVeg.includes("Cashew")) {
        cy.wrap($ele).find("button").click();
        cy.wait(1000);
        cy.wrap($ele).should("contain.text", "ADDED");
      }
    });
  });
  it("Second Test", () => {
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
    cy.get(".brand").as("logo");
    cy.get("@logo").then((logo) => {
      cy.log(logo.text());
    });
    cy.get("@logo").should("have.text", "GREENKART");
  });
});
