import { createActions } from 'redux-actions'
import { loginAPI, logoutAPI } from '../api/auth-api'
import { showError } from './error-actions'

const { login, logout } = createActions({
  LOGIN: (accessToken, userProfile) => ({ accessToken, userProfile }),
  LOGOUT: () => ({})
})

export const userLogin = (userName, password) => {
  return async (dispatch) => {
    try {
      const response = await loginAPI(userName, password)
      dispatch(login(response.accessToken, response.userProfile))
    } catch (error) {
      dispatch(showError(error))
    }
  }
}

export const userLogout = () => {
  return async (dispatch) => {
    try {
      await logoutAPI()
      dispatch(logout())
    } catch (error) {
      dispatch(showError(error))
    }
  }
}
