Feature: Add a new task in the Todo app
    Scenario: Add a task with valid name
        Given User get in the application
        When User open the Categories form and creates a new Category with UpperCase
        Then This Category appears in the Category list