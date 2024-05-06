import Login from './index'
import { mount } from "cypress/react18"

describe('<Login />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(<Login />)
  })
})