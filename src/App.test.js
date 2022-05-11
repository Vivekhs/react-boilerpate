import { createMemoryHistory } from 'history'
import configureMockStore from 'redux-mock-store'
import App from './App'
import { mountWithBrowserRouterAndProvider, mountWithRouterAndProvider, shallowWithProvider } from './utils/test-utils'
const mockStore = configureMockStore()

describe('App', () => {
  it('should be able to render', () => {
    const store = mockStore({})
    const component = shallowWithProvider(App, {}, store)
    expect(component).toHaveLength(1)
  })

  it('should navigate to Login page if not logged in', () => {
    const store = mockStore({ auth: { isLoggedIn: false } })
    const wrapper = mountWithBrowserRouterAndProvider(App, {}, store)
    expect(wrapper.find('.login_form').hostNodes()).toHaveLength(1)
  })

  it('should redirect to Login page if not logged in', () => {
    const store = mockStore({ auth: { isLoggedIn: false } })
    const history = createMemoryHistory({
      initialEntries: ['/home']
    })
    mountWithRouterAndProvider(App, {}, store, history)
    expect(history.location.pathname).toEqual('/')
  })

  it('should navigate to Home page if logged in', () => {
    const store = mockStore({ auth: { isLoggedIn: true } })
    const wrapper = mountWithBrowserRouterAndProvider(App, {}, store)
    expect(wrapper.find('.page_loader')).toHaveLength(1)
  })
})
