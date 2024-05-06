import StepThree from './index'
import { mount } from "cypress/react18"

describe('<StepThree />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(<StepThree code='' document='' next={() => {}} />)
  })
})