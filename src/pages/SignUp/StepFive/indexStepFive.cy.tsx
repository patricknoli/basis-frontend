import { mount } from "cypress/react18"
import StepFive from './index'
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { AppProvider } from "../../../contexts/AppContext"

describe('<StepFive />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(
      <MemoryRouter initialEntries={
        ['/sign-up']
      }>
        <AppProvider>
          <Routes>
            <Route path="/sign-up" element={<StepFive />} />
          </Routes>
        </AppProvider>
      </MemoryRouter>
    )
  })
})