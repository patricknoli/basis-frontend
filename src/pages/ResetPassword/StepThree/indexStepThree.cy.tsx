import StepThree from './index'
import { mount } from "cypress/react18"

describe('<StepThree />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(<StepThree code='' document='' next={() => {}} />)
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
  })
})