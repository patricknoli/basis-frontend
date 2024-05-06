import StepOne from './index'
import { mount } from "cypress/react18"

describe('<StepOne />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(<StepOne saveDocument={() => {}} next={() => {}} />)
  })
})