import { loginAPI, logoutAPI } from '../api/auth-api'
// import { showError } from './error-actions'
import configureMockStore from 'redux-mock-store'
import { userLogin, userLogout } from './auth-actions'
import thunk from 'redux-thunk'
import { CustomError } from '../../utils/error-utils'

const mockStore = configureMockStore([thunk])

jest.mock('../api/auth-api', () => ({
  loginAPI: jest.fn(),
  logoutAPI: jest.fn()
}))

describe('Auth Actions', () => {
  beforeEach(() => {
    loginAPI.mockReset()
    logoutAPI.mockReset()
  })
  it('should be able to dispatch login action on success user login', () => {
    const store = mockStore({})
    const loginResponse = {
      accessToken: 'fakeToken',
      userProfile: {
        userName: 'fakeUser',
        firstName: 'fName',
        lastName: 'lName',
        email: 'abc@test.com'
      }
    }
    const expectedActions = [
      {
        type: 'LOGIN',
        payload: loginResponse
      }
    ]
    loginAPI.mockImplementation(() => Promise.resolve(loginResponse))
    return userLogin('fakeUser', 'fakePassword')(store.dispatch)
      .then(() => {
        const actions = store.getActions()
        expect(actions).toEqual(expectedActions)
      })
  })

  it('should be able to dispatch showError action on failed user login', () => {
    const store = mockStore({})
    const loginFailureError = new CustomError({
      message: 'fakeMesage',
      description: 'fakeDesc'
    })
    const expectedActions = [
      {
        error: true,
        type: 'SHOW_ERROR',
        payload: loginFailureError
      }
    ]

    loginAPI.mockImplementation(() => Promise.reject(loginFailureError))
    return userLogin('fakeUser', 'fakePassword')(store.dispatch)
      .then(() => {
        const actions = store.getActions()
        expect(actions).toEqual(expectedActions)
      })
  })

  it('should be able to dispatch logout action on success user logout', () => {
    const store = mockStore({})
    const expectedActions = [
      {
        type: 'LOGOUT',
        payload: {}
      }
    ]
    logoutAPI.mockImplementation(() => Promise.resolve({}))
    return userLogout()(store.dispatch)
      .then(() => {
        const actions = store.getActions()
        expect(actions).toEqual(expectedActions)
      })
  })

  it('should be able to dispatch showError action on failed user logout', () => {
    const store = mockStore({})
    const loginFailureError = new CustomError({
      message: 'fakeMesage',
      description: 'fakeDesc'
    })
    const expectedActions = [
      {
        error: true,
        type: 'SHOW_ERROR',
        payload: loginFailureError
      }
    ]

    logoutAPI.mockImplementation(() => Promise.reject(loginFailureError))
    return userLogout()(store.dispatch)
      .then(() => {
        const actions = store.getActions()
        expect(actions).toEqual(expectedActions)
      })
  })
})
