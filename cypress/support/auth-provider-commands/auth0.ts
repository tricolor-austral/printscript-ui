import {FRONTEND_URL} from "../../../src/utils/constants";

export function loginViaAuth0Ui(username: string, password: string) {
    // App landing page redirects to Auth0.
    cy.visit(FRONTEND_URL);

    // Espera a que aparezca el botón 'Log In'
    cy.wait(1000)
    // Haz clic en el botón 'Log In'
    cy.get('#login-button').should('be.visible').click();

    // Login on Auth0.
    cy.origin(
        `https://dev-mzg8hx5d6cmcfq7t.us.auth0.com`,
        { args: { username, password } },
        ({ username, password }) => {
            cy.get('input#username').type(username)
            cy.get('input#password').type(password, { log: false })
            cy.contains('button[value=default]', 'Continue').click()
        }
    )

    cy.wait(1000)

    // Ensure Auth0 has redirected us back to the RWA.
    cy.url().should('equal', 'https://tricolor-austral.duckdns.org/')
}



