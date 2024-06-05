import { mount } from "cypress/react18"
import StepFour from './index'

describe('<StepFour />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(<StepFour document="" email="" next={() => { }} />);
    cy.get('input[name="password"]').type('1234');
    cy.get('.MuiInputAdornment-positionEnd:first svg').click();
    cy.get('input[name="password"]').should('have.attr', 'type', 'text');
    cy.get('.MuiInputAdornment-positionEnd:first svg').click();
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
    cy.get('input[name="password_confirm"]').type('1234');
    cy.get('.MuiInputAdornment-positionEnd:last svg').click();
    cy.get('input[name="password_confirm"]').should('have.attr', 'type', 'text');
    cy.get('.MuiInputAdornment-positionEnd:last svg').click();
    cy.get('input[name="password_confirm"]').should('have.attr', 'type', 'password');
    cy.get('input[name="terms_accept"]').click();
    cy.get('.MuiDrawer-root').should('be.visible');
    cy.get('.MuiDrawer-root button').click();
    cy.get('input[name="terms_accept"]').should('be.checked');
  })
})