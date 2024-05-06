import { BiTestTube } from 'react-icons/bi'
import NavItem from './index'
import { mount } from "cypress/react18"

describe('<NavItem />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(<NavItem pathname='' icon={<BiTestTube /> }>Test</NavItem>)
  })
})