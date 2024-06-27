import {BACKEND_URL, FRONTEND_URL} from "../../src/utils/constants";

describe('Add snippet tests', () => {
  beforeEach(() => {
    cy.loginToAuth0(
        "pedropanosyan@gmail.com",
        "Ingsis2024*"
    );
  })

  it('Can add snippets manually', () => {
    cy.visit(FRONTEND_URL)
    cy.intercept('POST', BACKEND_URL+"/snippets", (req) => {
      req.reply((res) => {
        expect(res.statusCode).to.eq(200);
      });
    }).as('postRequest');

    cy.get('#add-snippet-button').click();
    cy.get('.MuiList-root > [tabindex="0"]').click();
    cy.get('#name').type('Some snippet name');
    cy.get('#demo-simple-select').click()
    cy.get('[data-testid="menu-option-printscript"]').click()

    cy.get('[data-testid="add-snippet-code-editor"]').click();
    cy.get('[data-testid="add-snippet-code-editor"]').type(`const snippet: String = "some snippet" \n print(snippet)`);
    cy.get('[data-testid="SaveIcon"]').click();

    cy.wait('@postRequest').its('response.statusCode').should('eq', 200);
  })

  /*it('Can add snippets via file', () => {
    cy.visit("/")
    cy.intercept('POST', BACKEND_URL + "/snippets", (req) => {
      req.reply((res) => {
        expect(res.statusCode).to.eq(200);
      });
    }).as('postRequest');

    /!* ==== Generated with Cypress Studio ==== *!/
    cy.get('[data-testid="upload-file-input"').selectFile("cypress/fixtures/my-very-cool-snippet.prs", {force: true})
    cy.wait(1000)
    cy.get('[data-testid="SaveIcon"]').click();

    cy.wait('@postRequest').its('response.statusCode').should('eq', 200);
  })*/
})
