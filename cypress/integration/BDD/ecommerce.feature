Feature: End to End Ecommerce validation

    Application Regression

    @Regression
    Scenario: Ecommerce Product Delivery

        Given I Open Ecommerce Page
        When I add Items to Cart
            | products               |
            | ["Blackberry","Nokia"] |
        And Validate the total Prices
        Then Select the Country submit and Verify Success

    @Smoke
    Scenario: Filling the Form for Shop
        Given I Open Ecommerce Page
        When I fill the Form Details
            | name | gender |
            | bobz | Male   |
        Then Validate the forms behaviour
        Then Select the Shop Page