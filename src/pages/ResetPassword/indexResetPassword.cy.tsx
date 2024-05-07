import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ResetPassword from './index'
import { mount } from "cypress/react18"
import { AppProvider } from '../../contexts/AppContext'

describe('<ResetPassword />', () => {
  it('render ResetPassword page', () => {
    // see: https://on.cypress.io/mounting-react
    mount(
      <MemoryRouter initialEntries={
        ['/reset-password']
      }>
        <AppProvider>
          <Routes>
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </AppProvider>
      </MemoryRouter>
    )
    cy.get('input[name="document"').type("00").blur();
    cy.get('p.MuiFormHelperText-root').should('not.be.empty');
    cy.get('input[name="document"]').clear().type("92981451014").should('have.value', '929.814.510-14').blur();
    cy.get('button[type="submit"]').click();
    cy.get('div.MuiSnackbarContent-message').should('not.be.empty');

    cy.get('input[name="document"').clear().type("841.913.690-59").blur();
    cy.get('button[type="submit"]').click();
  })
})