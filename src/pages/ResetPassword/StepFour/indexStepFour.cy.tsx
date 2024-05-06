import StepFour from './index'
import { mount } from "cypress/react18"

describe('<StepFour />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(<StepFour />)
  })
})