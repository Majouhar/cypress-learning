import "cypress-iframe";

describe("Handle Different Components", () => {
  // it("Checkbox Test", () => {
  //   cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
  //   cy.get("#checkBoxOption1")
  //     .check()
  //     .should("be.checked")
  //     .and("have.value", "option1");
  //   cy.get("#checkBoxOption1").uncheck().should("not.be.checked");
  //   cy.get("input[type='checkbox']")
  //     .check(["option2", "option3"])
  //     .should("be.checked");
  // });
  // it("Static Dropdown Test", () => {
  //   cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
  //   cy.get("select").select("option2").should("have.value", "option2");
  //   cy.get("select").select("option3").should("have.value", "option3");
  // });
  // it("Dynamic Dropdown Test", () => {
  //   cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
  //   cy.get("#autocomplete").type("ind");
  //   cy.get(".ui-menu-item  div").each(($ele, index, $list) => {
  //     if ($ele.text() === "India") {
  //       cy.wrap($ele).click();
  //     }
  //   });
  //   cy.get("#autocomplete").should("have.value", "India");
  // });
  // it("Visibilty Test", () => {
  //   cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
  //   cy.get("#displayed-text").should("be.visible");
  //   cy.get("#hide-textbox").click();
  //   cy.get("#displayed-text").should("not.be.visible");
  //   cy.get("#show-textbox").click();
  //   cy.get("#displayed-text").should("be.visible");
  // });
  // it("Radio Button Test", () => {
  //   cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
  //   cy.get('input[value="radio2"]').as("radio1").check().should("be.checked");
  //   cy.get('input[value="radio1"]').check().should("be.checked");
  //   cy.get("@radio1").should("not.be.checked");
  // });
  // it("Alert Test", () => {
  //   cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
  //   cy.get("#alertbtn").click();
  //   cy.on("window:alert", (str) => {
  //     expect(str).equal(
  //       "Hello , share this practice page and share your knowledge"
  //     );
  //   });
  //   cy.get("#confirmbtn").click();
  //   cy.on("window:confirm", (str) => {
  //     expect(str).equal("Hello , Are you sure you want to confirm?");
  //   });
  // });
  // it("Switch Windows Test", () => {
  //   cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
  //   cy.get("#opentab").should("have.attr", "target");
  //   cy.get("#opentab").invoke("removeAttr", "target").click();
  //   cy.origin("https://www.qaclickacademy.com/", () => {
  //     cy.get("#navbarSupportedContent a[href*='about']").click();
  //     cy.get(".mt-50 h2").should("contain", "QAClick Academy");
  //   });
  // });
  // it("Table Test", () => {
  //   cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
  //   cy.get("tr td:nth-child(2)").each($ele => {
  //     const text = $ele.text()
  //     if (text.includes("Python")){
  //       const textNew = ($ele).next("td").text()
  //       expect(textNew).equal("25")
  //       // cy.wrap($ele).next("td").then((ele)=>{
  //       //   expect(ele.text()).equal("25")
  //       // })
  //     }
  //   })
  // });
  // it("Hover Test", () => {
  //   cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
  //   cy.get(".mouse-hover-content").invoke("show");
  //   cy.contains("Top").click();
  //   // cy.contains("Top").click({force:true});
  //   cy.url().should("include", "#top");
  // });
  // it("Open Child Tab Different Approach Test", () => {
  //   cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
  //   cy.get("#opentab").then((ele) => {
  //     const url = ele.prop("href");
  //     cy.visit(url);
  //     cy.origin(url, () => {
  //       cy.get("div.sub-menu-bar a[href*='about']").click();
  //     });
  //   });
  // });
  // it("Iframe  Test", () => {
  //   cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

  //   cy.frameLoaded("#courses-iframe")
  //   cy.iframe().find("a[href*='mentorship']").eq(0).click()
  //   cy.wait(1000)
  //   cy.iframe().find("h1[class*='pricing-title']").should("have.length",2)
  //   cy.get("#displayed-text").should("be.visible");
  // });
  it("Calendar  Test", () => {
    const month = "6";
    const date = "15";
    const year = "2027";
    const expectedList = [month, date, year];
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    cy.get(".react-date-picker__inputGroup").click();
    cy.get(".react-calendar__navigation__label").click().click();
    cy.contains("button", year).click();
    cy.get(".react-calendar__year-view__months__month")
      .eq(Number(month) - 1)
      .click();
    cy.contains("abbr", date).click();
    cy.get(".react-date-picker__inputGroup__input").each(($ele, index) => {
      cy.wrap($ele).invoke("val").should("eq", expectedList[index]);
    });
  });
});
