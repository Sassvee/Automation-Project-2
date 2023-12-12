describe('Issue delete', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
        cy.visit(url + '/board');
        cy.contains('Try leaving a comment on this issue.').click();
      });
    });

    it('Issue Deletion Cancellation', () => {
        //Select delete issue and assert that the deletion confirmation window pops up
        cy.get(`[data-testid="icon:trash"]`).click()
        cy.get(`[data-testid="modal:confirm"]`).contains(`Are you sure you want to delete this issue?`)

        //Select cancel confirmation window and assert the issue is remains on the board
        cy.get(`[class="sc-bxivhb rljZq"]`).contains(`Cancel`).click()
        cy.get('[data-testid="modal:confirm"]').should(`not.exist`)
        cy.get('[data-testid="icon:close"]').eq(0).click()
        cy.contains('Try leaving a comment on this issue.').should(`be.visible`)
  
    });


    it('Issue deletion', () => {
        //Select delete issue and assert that the deletion confirmation window pops up
        cy.get(`[data-testid="icon:trash"]`).click()
        cy.get(`[data-testid="modal:confirm"]`).contains(`Are you sure you want to delete this issue?`)
        
        //Select delete issue from confirmation window and assert the issue is deleted
        cy.get(`[class="sc-bxivhb rljZq"]`).contains(`Delete issue`).click()
        cy.contains('Try leaving a comment on this issue.').should(`not.exist`)
        
    });

        
  });
  