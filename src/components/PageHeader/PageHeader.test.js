import { mount, shallow } from 'enzyme'
import { createMemoryHistory } from 'history'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as authActions from '../../state/actions/auth-actions'
import { mountWithRouterAndProvider } from '../../utils/test-utils'
import PageHeader from './PageHeader'

const mockStore = configureMockStore([thunk])

describe('PageHeader', () => {
  it('should be able to render without crash', () => {
    const wrapper = shallow(<PageHeader.WrappedComponent />)
    expect(wrapper).toHaveLength(1)
  })
  it('should be able to display heading label ', () => {
    const wrapper = mount(<PageHeader.WrappedComponent />)
    const headingLabel = wrapper.find('.header-container span')
    expect(headingLabel.text()).toEqual('UI Demo')
  })
  it('should be able to navigate to home page', () => {
    const store = mockStore({})
    const history = createMemoryHistory()
    const wrapper = mountWithRouterAndProvider(PageHeader, {}, store, history)
    const headingLabel = wrapper.find('.header-container span')
    headingLabel.simulate('click')
    expect(history.location.pathname).toEqual('/home')
  })

  it('should be able to logout', async () => {
    const store = mockStore({})
    const history = createMemoryHistory()
    const userLogoutSpy = jest.spyOn(authActions, 'userLogout')
    const wrapper = mountWithRouterAndProvider(PageHeader, {}, store, history)
    const logoutButton = wrapper.find('button[aria-label="Logout"]')
    logoutButton.simulate('click')
    expect(userLogoutSpy).toHaveBeenCalled()
  })
})
