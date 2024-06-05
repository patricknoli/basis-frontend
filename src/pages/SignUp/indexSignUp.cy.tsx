import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { mount } from "cypress/react18"
import { AppProvider } from '../../contexts/AppContext'
import SignUp from './index'

describe('<Sign Up />', () => {
  it('render SignUp page', () => {
    // see: https://on.cypress.io/mounting-react
    mount(
      <MemoryRouter initialEntries={
        ['/sign-up']
      }>
        <AppProvider>
          <Routes>
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </AppProvider>
      </MemoryRouter>
    )
    cy.get('input[name="email"').type("00").blur();
    cy.get('p.MuiFormHelperText-root').should('not.be.empty');
    cy.get('input[name="email"]').clear().type("email@test.com").blur();
    cy.get('button[type="submit"]').click();
    cy.get('div.MuiSnackbarContent-message').should('not.be.empty');
  })
})