import { mount } from "cypress/react18"
import StepTwo from './index'

describe('<StepTwo />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(<StepTwo next={() => { }} saveFinal={() => { }} saveInitial={() => { }} />)
  })
})