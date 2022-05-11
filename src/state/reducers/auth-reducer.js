import { handleActions } from 'redux-actions'

export const initialAuthState = () => ({
  userProfile: localStorage.getItem('userProfile') && JSON.parse(localStorage.getItem('userProfile')),
  isLoggedIn: !!localStorage.getItem('accessToken')
})

export const authReducer = handleActions({
  LOGIN: (state, action) => {
    localStorage.setItem('accessToken', action.payload.accessToken)
    localStorage.setItem('userProfile', JSON.stringify(action.payload.userProfile))
    return {
      ...state,
      userProfile: action.payload.userProfile,
      isLoggedIn: true
    }
  },
  LOGOUT: () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userProfile')
    return initialAuthState()
  }
}, initialAuthState())
