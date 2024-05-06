import ResetPassword from './index'
import { mount } from "cypress/react18"

describe('<ResetPassword />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(<ResetPassword />)
  })
})