Cypress.Commands.add('login', (email, password) => {
    cy.visit('https://my.pencilapp.com/account/login?continueUrl=spaces')
    cy.get('button')
        .should('be.visible')
        .contains('Continue with Email')
        .click();

    cy.get('input[type="text"][formcontrolname="email"]').type(email)
    cy.get('button')
        .should('be.visible')
        .contains('Continue').click();

    cy.get('input[type="password"][formcontrolname="password"]').type(password);

    cy.get('button')
        .should('be.visible')
        .contains('Continue').click();

    cy.get('h5')
        .should('be.visible')
        .contains('Home')
});
Cypress.Commands.add('clearAppData', () => {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.window().then((win) => {
      win.sessionStorage.clear()
    })
  });