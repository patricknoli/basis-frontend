import Container from './index'
import { mount } from 'cypress/react18'

describe('<Container />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(<Container>Hello world!</Container>)
  })
})