import { HTTP_METHODS, performFetch } from '../../utils/api-utils'

export const loginAPI = async (userName, password) => {
  return await performFetch('/user/sign_in', HTTP_METHODS.POST, { userName, password })
}

export const signUpAPI = async (userDetails) => {
  return await performFetch('/user/sign_up', HTTP_METHODS.POST, userDetails)
}

export const logoutAPI = async () => {
  return await performFetch('/user/sign_out', HTTP_METHODS.GET)
}
