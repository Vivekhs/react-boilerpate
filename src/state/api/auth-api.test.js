import { performFetch, HTTP_METHODS } from '../../utils/api-utils'
import { signUpAPI, loginAPI, logoutAPI } from './auth-api'

jest.mock('../../utils/api-utils', () => ({
  performFetch: jest.fn(),
  HTTP_METHODS: { GET: 'GET', POST: 'POST' }
}))

describe('Auth Apis', () => {
  beforeEach(() => {
    performFetch.mockReset()
  })
  it('should be able to call signup api', async () => {
    const userDetails = {
      userName: 'fakeUser',
      password: 'fakePassword',
      email: 'fakeEmail',
      firstName: 'fakeName',
      lastName: 'fakeName'
    }
    performFetch.mockImplementationOnce((url, method, body) => {
      expect(url).toEqual('/user/sign_up')
      expect(method).toEqual(HTTP_METHODS.POST)
      expect(body).toBe(userDetails)
      return Promise.resolve('fakeSignup')
    })
    const apiResponse = await signUpAPI(userDetails)
    expect(apiResponse).toEqual('fakeSignup')
  })
  it('should be able to call login api', async () => {
    const userDetails = {
      userName: 'fakeUser',
      password: 'fakePassword'
    }
    performFetch.mockImplementationOnce((url, method, body) => {
      expect(url).toEqual('/user/sign_in')
      expect(method).toEqual(HTTP_METHODS.POST)
      expect(body).toEqual(userDetails)
      return Promise.resolve('fakeSignin')
    })
    const apiResponse = await loginAPI(userDetails.userName, userDetails.password)
    expect(apiResponse).toEqual('fakeSignin')
  })

  it('should be able to call logout api', async () => {
    performFetch.mockImplementationOnce((url, method) => {
      expect(url).toEqual('/user/sign_out')
      expect(method).toEqual(HTTP_METHODS.GET)
      return Promise.resolve('fakeLogout')
    })
    const apiResponse = await logoutAPI()
    expect(apiResponse).toEqual('fakeLogout')
  })
})
