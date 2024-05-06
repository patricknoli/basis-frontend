import Hero from './index'
import { mount } from 'cypress/react18'

describe('<Hero />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(<Hero />)
  })
})