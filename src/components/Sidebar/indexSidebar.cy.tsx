import Sidebar from './index'
import { mount } from 'cypress/react18'

describe('<Sidebar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(<Sidebar />)
  })
})