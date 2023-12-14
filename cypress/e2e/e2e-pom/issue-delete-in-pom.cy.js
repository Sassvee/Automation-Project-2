/**
 * This is an example file and approach for POM in Cypress
 */
import IssueModal from "../../pages/IssueModal";

describe('Issue delete', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
    //open issue detail modal with title from line 16  
    cy.contains(issueTitle).click();
    });
  });

  //issue title, that we are testing with, saved into variable
  const issueTitle = 'Try leaving a comment on this issue.';

  it('Should cancel deletion process successfully', () => {
    // Assert that the issue exists on the board
    IssueModal.ensureIssueIsVisibleOnBoard(issueTitle)
    
    //Click trash icon, assert confirmation popup window is visible
    IssueModal.clickDeleteButton()

    //Click cancel button, assert the confirmation window closes and relocates you back to the issue
    IssueModal.cancelDeletion()

    //Close the issue
    IssueModal.closeDetailModal()

    //Assert that the issue exists on the board
    IssueModal.ensureIssueIsVisibleOnBoard(issueTitle)
  });

  it('Should delete issue successfully', () => {
    //Assert that the issue exists on the board
    IssueModal.ensureIssueIsVisibleOnBoard(issueTitle);
    
    //Click trash icon, assert confirmation popup window is visible
    IssueModal.clickDeleteButton();
    
    //Confirm and delete issue, assert that the issue has been deleted and no longer exist on the board
    IssueModal.confirmDeletion(issueTitle);

  });

  
});