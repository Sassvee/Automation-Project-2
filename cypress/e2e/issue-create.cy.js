import { faker } from '@faker-js/faker';
const randomWord = faker.lorem.word();
const randomSentence = faker.lorem.sentence();

describe('Issue create', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
    //System will already open issue creating modal in beforeEach block  
    cy.visit(url + '/board?modal-issue-create=true');
    });
  });
  
  it('Should create an issue and validate it successfully', () => {
    //System finds modal for creating issue and does next steps inside of it
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      
      //open issue type dropdown and choose Story
      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="select-option:Story"]')
          .trigger('click');
            
      //Type value to description input field
      cy.get('.ql-editor').type('TEST_DESCRIPTION');

      //Type value to title input field
      //Order of filling in the fields is first description, then title on purpose
      //Otherwise filling title first sometimes doesn't work due to web page implementation
      cy.get('input[name="title"]').type('TEST_TITLE');
      
      //Select Lord Gaben from reporter dropdown
      cy.get('[data-testid="select:userIds"]').click();
      cy.get('[data-testid="select-option:Lord Gaben"]').click();

      //Click on button "Create issue"
      cy.get('button[type="submit"]').click();
    });

    //Assert that modal window is closed and successful message is visible
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');
    
    //Reload the page to be able to see recently created issue
    //Assert that successful message has dissappeared after the reload
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');

    //Assert than only one list with name Backlog is visible and do steps inside of it
    cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
      //Assert that this list contains 5 issues and first element with tag p has specified text
      cy.get('[data-testid="list-issue"]')
          .should('have.length', '5')
          .first()
          .find('p')
          .contains('TEST_TITLE');
      //Assert that correct avatar and type icon are visible
      cy.get('[data-testid="avatar:Lord Gaben"]').should('be.visible');
      cy.get('[data-testid="icon:story"]').should('be.visible');
    });
  });

  it('Should validate title is required field if missing', () => {
    //System finds modal for creating issue and does next steps inside of it
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      //Try to click create issue button without filling any data
      cy.get('button[type="submit"]').click();

      //Assert that correct error message is visible
      cy.get('[data-testid="form-field:title"]').should('contain', 'This field is required');
    });
  });

  it('Custom issue creation and successful validation', () => {
    //System finds modal for creating issue and does next steps inside of it
    cy.get('[data-testid="modal:issue-create"]').within(() => {
        
      //Type value to description input field
      cy.get('.ql-editor').type('My bug description')
              
      //Type value in the "Short Summary" filed aka "Title"
      cy.get('input[name="title"]').type('Bug')
  
      //Open "Issue Type" dropdown window and select "Bug"
      cy.get('[data-testid="select:type"]').click()
      cy.get('[data-testid="select-option:Bug"]').trigger('click')
        
      //Select "Highest" from Priority dropdwn window
      cy.get('[data-testid="select:priority"]').click()
      cy.get('[data-testid="select-option:Highest"]').click()
  
      //Select "Pickle Rick" from Reporter dropdown window
      cy.get('[data-testid="select:userIds"]').click()
      cy.get('[data-testid="select-option:Pickle Rick"]').click()

      //Click on button "Create issue"
      cy.get('button[type="submit"]').click()

    });
  
    //Assert that modal window is closed and successful message is visible
    cy.get('[data-testid="modal:issue-create"]').should('not.exist')
    cy.contains('Issue has been successfully created.').should('be.visible')
      
    //Reload the page to be able to see recently created issue
    //Assert that successful message has dissappeared after the reload
    cy.reload()
    cy.contains('Issue has been successfully created.').should('not.exist')
  
    //Assert than only one list with name Backlog is visible and do steps inside of it
    cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
    
    //Assert that this list contains 5 issues and first element with tag p has specified text
    cy.get('[data-testid="list-issue"]').should('have.length', '5').first().find('p').contains('Bug')
    
    //Assert that correct avatar and type icon are visible (Bug: Displays avatar next to created issue only when you choose an Assignee)
    cy.get('[data-testid="avatar:Pickle Rick"]').should('be.visible')
    cy.get('[data-testid="icon:bug"]').should('be.visible')

    });
  });
  
  it.only('Random Data Plugin issue creation and successful validation', () => {
    //System finds modal for creating issue and does next steps inside of it
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      
      //Type value to description input field
      cy.get('.ql-editor').type(randomSentence)
              
      //Type value in the "Short Summary" filed aka "Title"
      cy.get('input[name="title"]').type(randomWord)
  
      //Assert that "Issue Type" default is preset as "Task" and leave as is
      cy.get('[data-testid="select:type"]').contains('Task')
        
      //Select "Low" from Priority dropdwn window
      cy.get('[data-testid="select:priority"]').click()
      cy.get('[data-testid="select-option:Low"]').click()
  
      //Select "Baby Yoda" from Reporter dropdown window
      cy.get('[data-testid="select:userIds"]').click()
      cy.get('[data-testid="select-option:Baby Yoda"]').click()

      //Click on button "Create issue"
      cy.get('button[type="submit"]').click()

    });
  
    //Assert that modal window is closed and successful message is visible
    cy.get('[data-testid="modal:issue-create"]').should('not.exist')
    cy.contains('Issue has been successfully created.').should('be.visible')
      
    //Reload the page to be able to see recently created issue
    //Assert that successful message has dissappeared after the reload
    cy.reload()
    cy.contains('Issue has been successfully created.').should('not.exist')
  
    //Assert than only one list with name Backlog is visible and do steps inside of it
    cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
    
    //Assert that this list contains 5 issues and first element with tag p has specified text
    cy.get('[data-testid="list-issue"]').should('have.length', '5').first().find('p').contains(randomWord)

    //Assert that correct avatar and type icon are visible (Bug: Displays avatar next to created issue only when you choose an Assignee)
    cy.get('[data-testid="avatar:Baby Yoda"]').should('be.visible')
    cy.get('[data-testid="icon:task"]').should('be.visible')
      
    });
  });

});
