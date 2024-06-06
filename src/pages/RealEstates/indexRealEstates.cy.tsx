import { mount } from "cypress/react18"
import RealEstates from './index'
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { AppProvider } from "../../contexts/AppContext"

describe('<RealEstates />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(<MemoryRouter initialEntries={
      ['/real-estates']
    }>
      <AppProvider>
        <Routes>
          <Route path="/real-estates" element={<RealEstates />} />
        </Routes>
      </AppProvider>
    </MemoryRouter>)
    const staticResponse = [
      {
        "descricao": "Inadiplência",
        "url": "http://144.22.185.135:8190/chamadaRelatorio/inadiplencia",
        "dataInicialFinal": true,
        "ano": false
      },
      {
        "descricao": "Contratado X Recebido",
        "url": "http://144.22.185.135:8190/chamadaRelatorio/contratadoxrecebido",
        "dataInicialFinal": true,
        "ano": false
      },
      {
        "descricao": "Provisão",
        "url": "http://144.22.185.135:8190/chamadaRelatorio/provisao",
        "dataInicialFinal": true,
        "ano": false
      },
      {
        "descricao": "Contratos em andamento",
        "url": "http://144.22.185.135:8190/chamadaRelatorio/contratoandamento",
        "dataInicialFinal": false,
        "ano": false
      },
      {
        "descricao": "Vacância",
        "url": "http://144.22.185.135:8190/chamadaRelatorio/vacancia",
        "dataInicialFinal": false,
        "ano": false
      },
      {
        "descricao": "Revisão trianual ",
        "url": "http://144.22.185.135:8190/chamadaRelatorio/revisao",
        "dataInicialFinal": false,
        "ano": false
      },
      {
        "descricao": "Garantias ",
        "url": "http://144.22.185.135:8190/chamadaRelatorio/garantia",
        "dataInicialFinal": false,
        "ano": false
      },
      {
        "descricao": "Seguro imóvel ",
        "url": "http://144.22.185.135:8190/chamadaRelatorio/segimovel",
        "dataInicialFinal": false,
        "ano": false
      },
      {
        "descricao": "Seguro condominio ",
        "url": "http://144.22.185.135:8190/chamadaRelatorio/segcondominio",
        "dataInicialFinal": false,
        "ano": false
      },
      {
        "descricao": "Vencimento contratos ",
        "url": "http://144.22.185.135:8190/chamadaRelatorio/contratovencimento",
        "dataInicialFinal": false,
        "ano": false
      },
      {
        "descricao": "Assembleia",
        "url": "http://144.22.185.135:8190/chamadaRelatorio/assembleia",
        "dataInicialFinal": false,
        "ano": false
      },
      {
        "descricao": "Vistoria",
        "url": "http://144.22.185.135:8190/chamadaRelatorio/vistoria",
        "dataInicialFinal": false,
        "ano": false
      },
      {
        "descricao": "Relatório completo ",
        "url": "http://144.22.185.135:8190/chamadaRelatorio/completo",
        "dataInicialFinal": true,
        "ano": false
      },
    ]

    cy.intercept('GET', '/relatorios/listar', staticResponse);
    cy.get('.reports input[type=checkbox]').each(($input) => {
      cy.wrap($input).should('be.checked');
    });
    cy.get('input[type=checkbox]:first').click();
    cy.get('.reports input[type=checkbox]').each(($input) => {
      cy.wrap($input).should('not.be.checked');
    });
    cy.get('input[type=text]').type('cont');
    cy.get('label span').contains('cont').each(($label) => {
      cy.wrap($label).should('be.visible');
    })
    cy.get('label span').contains(/^((?!cont).)*$/).each(($label) => {
      cy.wrap($label).should('not.be.visible');
    })
  })
})