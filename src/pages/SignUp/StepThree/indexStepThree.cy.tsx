import { mount } from "cypress/react18"
import StepThree from ".";

describe('<StepThree />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(<StepThree next={() => { }} saveDocument={() => { }} />)
    cy.get('input').type("00").blur();
    cy.get('p.MuiFormHelperText-root').should('not.be.empty');
    cy.get('input').clear().type("92981451014").should('have.value', '929.814.510-14').blur();
  })
})