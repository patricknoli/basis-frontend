import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Sidebar from './index'
import { mount } from 'cypress/react18'
import { AppProvider } from '../../contexts/AppContext'

describe('<Sidebar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(
      <MemoryRouter initialEntries={
        ['/']
      }>
        <AppProvider>
          <Routes>
            <Route path="/" element={<Sidebar />} />
          </Routes>
        </AppProvider>
      </MemoryRouter>
      
    )
  })
})