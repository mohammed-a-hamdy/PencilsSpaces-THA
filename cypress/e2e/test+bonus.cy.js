describe('Integration test for Pencil App', () => {
  before(() => {
    cy.clearAppData();
    cy.login('m.ahmed94dev@gmail.com', 'ahah444ola');
  })
  // Common functions
  const visitPencilApp = () => {
    cy.visit('https://my.pencilapp.com/');
  };

  const enterSpace = () => {
    cy.get('tr').contains('My First Space').get('button').contains('Enter Space').should('be.visible').click();
  };

  // Login and Authentication
  describe('Authentication', () => {
    it('Verify login under 1000ms', () => {
      visitPencilApp();
      cy.get('app-spaces-list', { timeout: 1000 }).should('be.visible');
    });

    it('Verify Sign-out and Redirect to login page', () => {
      visitPencilApp();
      cy.get('#btn-home-avatar-menu').should('be.visible').click();
      cy.get('button').contains('Sign-out').should('be.visible').click();
      cy.get('button').contains('Logout').should('be.visible').click();
      cy.get('button').contains('Continue with Email').should('be.visible');
      visitPencilApp();
      cy.get('button').contains('Continue with Email').should('be.visible');
    });
  });

  // Home Page
  describe('Home Page', () => {
    it('Verify spaces list is eq 1', () => {
      visitPencilApp();
      cy.get('app-spaces-list').should('be.visible');
      cy.get('app-space-list-title-section.space-title')
        .and('have.length', 1)
        .should('contain', 'My First Space');
    });

    it('Verify side-bar contains Home & Messages', () => {
      visitPencilApp();
      cy.get('.main-navbar-item_title')
        .should('contain', 'Home')
        .and('contain', 'Messages');
    });

    it('Verify Create Space is available and Logo is visible', () => {
      visitPencilApp();
      cy.get('app-pencil-button').contains('Create Space').should('be.visible');
      cy.get('.profile-icon').should('be.visible');
    });
  });

  // Space Functionality
  describe('Space Functionality', () => {
    it.only('Enter First Space and Draw', () => {
      visitPencilApp();
      enterSpace();
      cy.get('button').contains('zoom_in').click();
      cy.get('button').contains('fit_screen').click();
      cy.get('button').contains('Shapes').should('be.visible').click();
      cy.get('button[data-name="space-toolbar-button-object-line"]').click();

      cy.get('.upper-canvas.fabric-canvas').click('center');
      cy.get('.upper-canvas.fabric-canvas').trigger('mousemove', {
        clientX: 960,
        clientY: 0,
        force: true
      });
      cy.wait(1000);
      cy.get('.upper-canvas.fabric-canvas')
        .trigger('mousedown', { which: 1 })
        .trigger('mousemove', {
          clientX: 960,
          clientY: 50,
          force: true
        });
      cy.wait(1000);

      cy.get('.upper-canvas.fabric-canvas')
        .trigger('mousedown', { which: 2 })
        .trigger('mouseup', { force: true });
      cy.get('.upper-canvas.fabric-canvas').click(15, 40, { force: true });


      cy.get('button').contains('Select').should('be.visible').click();
      cy.get('.upper-canvas.fabric-canvas').trigger('mousedown', {
        clientX: 960,
        clientY: 0,
        force: true
      });
      cy.wait(1000);
      cy.get('.upper-canvas.fabric-canvas')
        .trigger('mousedown', { which: 1 })
        .trigger('mousemove', {
          clientX: 960,
          clientY: 50,
          force: true
        });
      cy.get('.upper-canvas.fabric-canvas')
        .trigger('mouseup', { force: true });
      cy.wait(1000);
      cy.get('body').type('{rightarrow}');


    });

    it('Enter First Space and Add Text box', () => {
      visitPencilApp();
      enterSpace();
      cy.get('button').contains('Text').should('be.visible').click();
      cy.get('.upper-canvas.fabric-canvas').click('center');
      cy.get('.upper-canvas.fabric-canvas').type('This is a test');
      cy.get('.upper-canvas.fabric-canvas').click(15, 40, { force: true });
    });

    it('Bonus: create new board, name=test, add text box, change it italicized', () => {
      visitPencilApp();
      enterSpace();
      cy.get('button').contains('Boards').should('be.visible').click();
      cy.get('button').contains('New').should('be.visible').click();
      cy.get('button').contains('Text').should('be.visible').click();

      cy.get('.upper-canvas.fabric-canvas').click('center');
      cy.get('.upper-canvas.fabric-canvas').type('test');
      cy.get('.upper-canvas.fabric-canvas').click(15, 40, { force: true });
      cy.get('.upper-canvas.fabric-canvas').click('center');

      cy.get('app-space-toolbar-button')
        .contains('format_italic')
        .click({ force: true });
    });
  });
});