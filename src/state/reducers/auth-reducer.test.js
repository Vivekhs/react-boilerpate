import { authReducer, initialAuthState } from './auth-reducer'

describe('Auth Reducer', () => {
  it('should be able to set initial state', () => {
    const state = authReducer(undefined, {})
    expect(state).toEqual(initialAuthState())
  })
  it('should be able to update state on success user login', () => {
    const loginResponse = {
      userProfile: 'fakeProfile',
      accessToken: 'fakeToken'
    }
    const state = authReducer(initialAuthState(), {
      type: 'LOGIN',
      payload: loginResponse
    })
    expect(state).toEqual({
      isLoggedIn: true,
      userProfile: loginResponse.userProfile
    })
    expect(localStorage.getItem('accessToken')).toEqual(loginResponse.accessToken)
    expect(localStorage.getItem('userProfile')).toEqual(JSON.stringify(loginResponse.userProfile))
  })

  it('should be able to update state on success user logout', () => {
    const loginResponse = {
      userProfile: 'fakeProfile',
      accessToken: 'fakeToken'
    }
    let state = authReducer(initialAuthState(), {
      type: 'LOGIN',
      payload: loginResponse
    })
    state = authReducer(initialAuthState(), {
      type: 'LOGOUT',
      payload: {}
    })
    expect(state).toEqual(initialAuthState())
    expect(localStorage.getItem('accessToken')).toEqual(null)
    expect(localStorage.getItem('userProfile')).toEqual(null)
  })
})
