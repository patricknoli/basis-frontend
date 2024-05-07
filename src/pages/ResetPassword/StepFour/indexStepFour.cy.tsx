import { MemoryRouter, Route, Routes } from 'react-router-dom'
import StepFour from './index'
import { mount } from "cypress/react18"
import { AppProvider } from '../../../contexts/AppContext'

describe('<StepFour />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(
      <MemoryRouter initialEntries={
        ['/reset-password']
      }>
        <AppProvider>
          <Routes>
            <Route path="/reset-password" element={<StepFour />} />
          </Routes>
        </AppProvider>
      </MemoryRouter>
    )
  })
})