import { createMemoryHistory } from 'history'
import configureMockStore from 'redux-mock-store'
import { mountWithBrowserRouterAndProvider, mountWithProvider, mountWithRouter, mountWithRouterAndProvider, shallowWithProvider, shallowWithRouterAndProvider } from './test-utils'

const mockStore = configureMockStore([])

const Component = () => <div />
describe('Test Utils', () => {
  let store
  beforeEach(() => {
    store = mockStore({})
  })
  it('should be able to mount component with a provider', () => {
    const wrapper = mountWithProvider(Component, {}, store)
    expect(wrapper).toHaveLength(1)
  })

  it('should be able to mount component with a Router', () => {
    const history = createMemoryHistory()
    const wrapper = mountWithRouter(Component, {}, history)
    expect(wrapper).toHaveLength(1)
  })

  it('should be able to mount component with a Router and Provider', () => {
    const history = createMemoryHistory()
    const wrapper = mountWithRouterAndProvider(Component, {}, store, history)
    expect(wrapper).toHaveLength(1)
  })

  it('should be able to mount component with a BrowserRouter and Provider', () => {
    const wrapper = mountWithBrowserRouterAndProvider(Component, {}, store)
    expect(wrapper).toHaveLength(1)
  })

  it('should be able to shallow component with a provider', () => {
    const wrapper = shallowWithProvider(Component, {}, store)
    expect(wrapper).toHaveLength(1)
  })

  it('should be able to shallow component with a Router and Provider', () => {
    const history = createMemoryHistory()
    const wrapper = shallowWithRouterAndProvider(Component, {}, store, history)
    expect(wrapper).toHaveLength(1)
  })
})
