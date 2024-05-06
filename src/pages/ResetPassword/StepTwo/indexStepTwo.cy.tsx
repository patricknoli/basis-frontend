import StepTwo from './index'
import { mount } from "cypress/react18"

describe('<StepTwo />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(<StepTwo next={() => {}} saveCode={() => {}} />)
  })
})