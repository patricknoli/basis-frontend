import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Container from './index'
import { mount } from 'cypress/react18'
import { AppProvider } from '../../contexts/AppContext'

describe('<Container />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(
      <MemoryRouter initialEntries={
        ['/']
      }>
        <AppProvider>
          <Routes>
            <Route path="/" element={<Container>Hello world!</Container>} />
          </Routes>
        </AppProvider>
      </MemoryRouter>
    )
  })
})