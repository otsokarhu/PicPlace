import { Chainable } from 'cypress';

Cypress.Commands.add('login', (username, password) => {
  cy.visit('/');
  cy.contains('Login').click();
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[name="login"]').click();
});

Cypress.Commands.add(
  'register_user',
  (username, password) => {
    cy.visit('/');
    cy.contains('Sign Up').click();
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="confirmPassword"]').type(password);
    cy.get('button[name="signup"]').click();
  }
);

Cypress.Commands.add(
  'upload',
  (filename, caption) => {
    cy.visit('/');
    cy.contains('Gallery').click();
    cy.url().should('include', '/gallery');
    cy.contains('Upload a picture').click();
    cy.contains('image').selectFile(`cypress/fixtures/${filename}`, { action: 'drag-drop'})
    cy.get('input[name="caption"]').type(caption);
    cy.get('button[name="Upload"]').click();
  }
);

declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>;
      register_user(
        username: string,
        password: string
      ): Chainable<void>;
      upload(filename: string, caption: string): Chainable<void>;
    }
  }
}
