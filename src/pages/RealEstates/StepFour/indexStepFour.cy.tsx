import { mount } from "cypress/react18"
import StepFour from './index'
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { AppProvider } from "../../../contexts/AppContext"

describe('<StepFour />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(<MemoryRouter initialEntries={
      ['/real-estates']
    }>
      <AppProvider>
        <Routes>
          <Route path="/real-estates" element={<StepFour properties={[]} reports={[]} finalDate="" initialDate="" />} />
        </Routes>
      </AppProvider>
    </MemoryRouter>)
    cy.get('input[type=radio]:first').click();
    cy.get('button.download').should('be.visible');
    cy.get('input[type=checkbox]').click();
    cy.get('input[type=text]').should('be.visible').type('email');
    cy.get('p.MuiFormHelperText-root').should('not.be.empty');
    cy.get('input[type=text]').type('@email.com');
  })
})