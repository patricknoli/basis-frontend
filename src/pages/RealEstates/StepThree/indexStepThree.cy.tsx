import { mount } from "cypress/react18"
import StepThree from './index'

describe('<StepThree />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(<StepThree next={() => { }} saveProperties={() => { }} />);
    const staticResponse = {
      "configuracao": "I",
      "listaImoveis": [
        {
          "imovel": {
            "idtbbobjetoimovel": 120000000000138,
            "imovelcodigopesquisa": "00001035",
            "endereco": "RUA VÍTOR BATISTA 1 ",
            "bairro": "SANTO ANTÔNIO",
            "cidade": "ITABUNA",
            "estado": "BA",
            "cep": "45602-210"
          }
        },
        {
          "imovel": {
            "idtbbobjetoimovel": 120000000000139,
            "imovelcodigopesquisa": "00001036",
            "endereco": "RUA APARECIDO CARLOS GAVA 2 ",
            "bairro": "LOTEAMENTO JARDIM AMÉRICA",
            "cidade": "ARAGUAÍNA",
            "estado": "TO",
            "cep": "77805-200"
          }
        },
        {
          "imovel": {
            "idtbbobjetoimovel": 120000000000141,
            "imovelcodigopesquisa": "00001037",
            "endereco": "RUA ALTAIR DOMINGUES 3 ",
            "bairro": "MARTA HELENA",
            "cidade": "UBERLÂNDIA",
            "estado": "MG",
            "cep": "38402-044"
          }
        },
        {
          "imovel": {
            "idtbbobjetoimovel": 120000000000150,
            "imovelcodigopesquisa": "00001040",
            "endereco": "QUADRA QC 7 BLOCO 2 1 ",
            "bairro": "PARQUE DAS FLORES",
            "cidade": "VALPARAÍSO DE GOIÁS",
            "estado": "GO",
            "cep": "72878-342"
          }
        },
        {
          "imovel": {
            "idtbbobjetoimovel": 120000000000153,
            "imovelcodigopesquisa": "00001041",
            "endereco": "RUA MARIA DE LURDES DEITER 2 ",
            "bairro": "VILA SÃO SEBASTIÃO",
            "cidade": "CRICIÚMA",
            "estado": "SC",
            "cep": "88807-098"
          }
        },
        {
          "imovel": {
            "idtbbobjetoimovel": 120000000000154,
            "imovelcodigopesquisa": "00001042",
            "endereco": "RUA BRUMADO 3 ",
            "bairro": "SÃO JOÃO E SÃO PAULO",
            "cidade": "CAMARAGIBE",
            "estado": "PE",
            "cep": "54780-305"
          }
        },
        {
          "imovel": {
            "idtbbobjetoimovel": 120000000000156,
            "imovelcodigopesquisa": "00001043",
            "endereco": "RUA ARTUR SILVEIRA 3 ",
            "bairro": "ININGA",
            "cidade": "TERESINA",
            "estado": "PI",
            "cep": "64048-545"
          }
        },
        {
          "imovel": {
            "idtbbobjetoimovel": 120000000000158,
            "imovelcodigopesquisa": "00001044",
            "endereco": "RUA MIRTÁCIA 4 ",
            "bairro": "SANTO ANTÔNIO",
            "cidade": "TERESINA",
            "estado": "PI",
            "cep": "64029-050"
          }
        },
        {
          "imovel": {
            "idtbbobjetoimovel": 120000000000159,
            "imovelcodigopesquisa": "00001045",
            "endereco": "RUA DOUTOR CHRYSIPPO DE AGUIAR 5 ",
            "bairro": "VITÓRIA",
            "cidade": "SALVADOR",
            "estado": "BA",
            "cep": "40081-310"
          }
        },
        {
          "imovel": {
            "idtbbobjetoimovel": 120000000000160,
            "imovelcodigopesquisa": "00001046",
            "endereco": "RUA DOUTOR FERNANDO FERRARI 6 ",
            "bairro": "ESTALAGEM",
            "cidade": "VIAMÃO",
            "estado": "RS",
            "cep": "94425-277"
          }
        },
        {
          "imovel": {
            "idtbbobjetoimovel": 120000000000161,
            "imovelcodigopesquisa": "00001047",
            "endereco": "RUA VALDIMIR DE MIRANDA 7 ",
            "bairro": "CENTRO",
            "cidade": "MACEIÓ",
            "estado": "AL",
            "cep": "57020-620"
          }
        },
        {
          "imovel": {
            "idtbbobjetoimovel": 120000000000162,
            "imovelcodigopesquisa": "00001048",
            "endereco": "RODOVIA BR-364 8 ",
            "bairro": "PORTAL DA AMAZÔNIA",
            "cidade": "RIO BRANCO",
            "estado": "AC",
            "cep": "69915-630"
          }
        },
        {
          "imovel": {
            "idtbbobjetoimovel": 120000000000163,
            "imovelcodigopesquisa": "00001049",
            "endereco": "RUA BOA ESPERANÇA 8 ",
            "bairro": "JARDIM LIMOEIRO",
            "cidade": "SERRA",
            "estado": "ES",
            "cep": "29164-150"
          }
        }
      ]
    }
    cy.intercept('GET', '/correntistas/proprietario/imoveis/listar', staticResponse);
    cy.get('.properties input[type=checkbox]').each(($input) => {
      cy.wrap($input).should('be.checked');
    });
    cy.get('input[type=checkbox]:first').click();
    cy.get('.properties input[type=checkbox]').each(($input) => {
      cy.wrap($input).should('not.be.checked');
    });
    cy.get('input[type=text]').type('do');
    cy.get('label span').contains('do').each(($label) => {
      cy.wrap($label).should('be.visible');
    })
    cy.get('label span').contains(/^((?!do).)*$/).each(($label) => {
      cy.wrap($label).should('not.be.visible');
    })
    cy.get('.properties input[type=checkbox]').each(($input) => {
      cy.wrap($input).click().should('be.checked');
    });
    cy.get('.properties').find('input[type=checkbox]').its('length').then((count) => cy.get('.count').should('contain.text', count));
  })
})