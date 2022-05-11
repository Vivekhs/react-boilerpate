import { createMemoryHistory } from 'history'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as authActions from '../../state/actions/auth-actions'
import * as errorActions from '../../state/actions/error-actions'
import { mountWithRouter, mountWithRouterAndProvider } from '../../utils/test-utils'
import Login from './Login'

const mockStore = configureMockStore([thunk])

describe('Login', () => {
  it('should be able to render', () => {
    const store = mockStore({ auth: {} })
    const history = createMemoryHistory()
    const wrapper = mountWithRouterAndProvider(Login, {}, store, history)
    expect(wrapper).toHaveLength(1)
  })

  it('should route to home when already logged in', () => {
    const store = mockStore({ auth: { isLoggedIn: true } })
    const history = createMemoryHistory()
    mountWithRouterAndProvider(Login, {}, store, history)
    expect(history.location.pathname).toEqual('/home')
  })
  it('should be able to submit login form', () => {
    const store = mockStore({ auth: {} })
    const history = createMemoryHistory()
    const userLoginSpy = jest.spyOn(authActions, 'userLogin')
    const wrapper = mountWithRouterAndProvider(Login, {}, store, history)
    const userNameInput = wrapper.find('#userName').hostNodes()
    const passwordInput = wrapper.find('#password').hostNodes()
    const submitBtn = wrapper.find('#formSubmitBtn').hostNodes()
    userNameInput.simulate('change', { target: { id: 'userName', value: 'fakeuser' } })
    passwordInput.simulate('change', { target: { id: 'password', value: 'fakepassword' } })
    submitBtn.simulate('click')
    expect(userLoginSpy).toHaveBeenCalledWith('fakeuser', 'fakepassword')
  })

  it('should show validation error if username and password is not provided', () => {
    const history = createMemoryHistory()
    const wrapper = mountWithRouter(Login.WrappedComponent, {
      login: jest.fn(),
      resetError: jest.fn(),
      isLoggedIn: false
    }, history)
    const submitBtn = wrapper.find('#formSubmitBtn').hostNodes()
    submitBtn.simulate('click')
    expect(wrapper.find('#userName-error-msg').text()).toEqual('user name is required')
    expect(wrapper.find('#password-error-msg').text()).toEqual('password is required')
  })

  it('should show an error notification in case of an error', () => {
    const store = mockStore({ auth: {}, error: { description: 'Invalid username or password' } })
    const history = createMemoryHistory()
    const resetErrorSpy = jest.spyOn(errorActions, 'resetError')
    const wrapper = mountWithRouterAndProvider(Login, {}, store, history)
    const notificationDescription = wrapper.find('.bx--inline-notification__subtitle')
    expect(notificationDescription.text()).toEqual('Invalid username or password')
    const closeNotificationBtn = wrapper.find('.bx--inline-notification__close-button')
    closeNotificationBtn.simulate('click')
    expect(resetErrorSpy).toHaveBeenCalled()
    expect(wrapper.find('.bx--inline-notification__subtitle')).toHaveLength(0)
  })
})
