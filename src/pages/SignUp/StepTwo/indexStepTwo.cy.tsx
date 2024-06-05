import { mount } from "cypress/react18"
import StepTwo from ".";

describe('<StepTwo />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(<StepTwo next={() => { }} email="" />)
    cy.get('.MuiOtpInput-Box input:first').click().type('123456');
  })
})