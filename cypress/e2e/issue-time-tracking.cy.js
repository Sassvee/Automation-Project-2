//Consts
const getIssueDetailsModal = () =>cy.get('[data-testid="modal:issue-details"]');
const getTimeTrackingModal = () => cy.get('[data-testid="modal:tracking"]');
const getStopwatch = () => cy.get('[data-testid="icon:stopwatch"]');

//Estimation Functions
function NewEstimate() {
  cy.get('[placeholder="Number"]').clear().type("12345");
  cy.contains("12345h estimated").should("be.visible");
}
function EditEstimate() {
  cy.get('[placeholder="Number"]').clear().type("77");
  cy.contains("77h estimated").should("be.visible");
}
function RemoveEstimate() {
  cy.get('[placeholder="Number"]').clear();
  cy.contains("77h estimated").should("not.exist");
}

//Time-Logging Functions
function NewTimeLogged() {getStopwatch().click()
    cy.get('input[placeholder="Number"]').eq(1).clear().type("7");
    cy.get('input[placeholder="Number"]').eq(2).clear().type("7");
    cy.contains("button", "Done").click();

    getTimeTrackingModal().should("not.exist");
    getIssueDetailsModal().should("be.visible");
    cy.contains("7h logged").should("be.visible");
    cy.contains("7h remaining").should("be.visible");
    
}
function EditTimeLogged() {getStopwatch().click()
    cy.get('input[placeholder="Number"]').eq(1).clear().type("1");
    cy.get('input[placeholder="Number"]').eq(2).clear().type("1");
    cy.contains("button", "Done").click();

    getTimeTrackingModal().should("not.exist");
    getIssueDetailsModal().should("be.visible");
    cy.contains("1h logged").should("be.visible");
    cy.contains("1h remaining").should("be.visible");
    
}
function RemoveTimeLogged() {getStopwatch().click()
    cy.get('input[placeholder="Number"]').eq(1).clear();
    cy.get('input[placeholder="Number"]').eq(2).clear();
    cy.contains("button", "Done").click();

    getTimeTrackingModal().should("not.exist");
    getIssueDetailsModal().should("be.visible");
    cy.contains("No time logged").should("be.visible");
    cy.contains("8h estimated").should("be.visible");
    
}

//ASSIGNMENT 2 / SPRINT 2: ADD AUTOMATION TESTS FOR TIME TRACKING FUNCTIONALITY

describe("Issue time tracking functionality", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains("This is an issue of type: Task.").click();
      });
  });

  it("Adding, editing and removing estimation values", () => {
    getIssueDetailsModal().within(() => {
      //Assert the existence of the estimated time function in the issue modal
      cy.contains("Original Estimate (hours)").should("exist");
      cy.contains("estimated").should("exist");

      //Assert that new value can be added and is visible
      NewEstimate();

      //Assert that value can be edited and changes are visible
      EditEstimate();

      //Assert that value can be removed and is not visible
      RemoveEstimate();
    });
  });

  it("Adding, editing and removing time-logging values", () => {
      //Assert the existence of the time-logging function in the issue modal
      getIssueDetailsModal()  
      cy.contains("logged").should("exist");
      cy.get('[data-testid="icon:stopwatch"]').should("exist");
    
      //Assert the existence and contents of Time-Tracking Modal
      getStopwatch().click();
      getTimeTrackingModal().should("exist")
      .contains("button", "Done")
      .should("exist");
      cy.get('input[placeholder="Number"]').eq(1).should("exist");
      cy.get('input[placeholder="Number"]').eq(2).should("exist");
      cy.get('[data-testid="icon:close"]').eq(2).should("exist").click();

      getTimeTrackingModal().should("not.exist");
      
      //Assert that new value can be added and is visible
      NewTimeLogged()
    
      //Assert that value can be edited and changes are visible
      EditTimeLogged()

      //Assert that value can be removed and is not visible
      RemoveTimeLogged()

  });
});
