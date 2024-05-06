import { MemoryRouter, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Login from './index'
import { mount } from "cypress/react18"
import { AppProvider } from '../../contexts/AppContext'

describe('<Login />', () => {
  it('validates input document', () => {
    // see: https://on.cypress.io/mounting-react
    mount(
      <MemoryRouter initialEntries={
        ['/login']
      }>
        <AppProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </AppProvider>
      </MemoryRouter>
    )
    cy.get('input[name="login"').type("00").blur();
    cy.get('p.MuiFormHelperText-root').should('not.be.empty');
    cy.get('input[name="login"]').clear().type("92981451014").should('have.value', '929.814.510-14').blur();
    cy.get('button[type="submit"]').click();
    cy.get('div.MuiSnackbarContent-message').should('not.be.empty');
  })
})