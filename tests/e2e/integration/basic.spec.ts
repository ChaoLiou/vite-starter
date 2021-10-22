// https://docs.cypress.io/api/introduction/api.html

describe('Home', () => {
  it('Search and filter features', () => {
    cy.visit('/');
    cy.get('input').click().type('cypress');
    cy.get('.ant-list-item').find('.ant-card-head').should('have.text', 'Testing Library');
  });
});
