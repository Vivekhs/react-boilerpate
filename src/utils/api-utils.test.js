import { performFetch, HTTP_METHODS, host } from './api-utils'
import { getError } from './error-utils'
describe('API Utils', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })
  it('should be able to call an api successfully', async () => {
    const mockResponse = { message: 'success' }
    fetch.mockResponseOnce(JSON.stringify(mockResponse))

    const response = await performFetch('/testMock', HTTP_METHODS.POST, {})
    expect(response).toEqual(mockResponse)
  })

  it('should attach access token for logged in users', async () => {
    const mockResponse = { message: 'success' }
    localStorage.setItem('accessToken', 'fakeToken')
    fetch.mockResponseOnce(JSON.stringify(mockResponse))
    const response = await performFetch('/testMock', HTTP_METHODS.GET)
    expect(response).toEqual(mockResponse)
    expect(fetch).toBeCalledWith(`${host}/testMock`, { body: undefined, headers: { access_token: 'fakeToken' }, method: 'GET' })
  })

  it('should throw an error if api call fails', async () => {
    const fakeErrorResponse = { message: 'fakeMesage', description: 'fakeDesc' }
    fetch.mockResponse(JSON.stringify(fakeErrorResponse), {
      status: 400
    })
    try {
      await performFetch('/testMock', HTTP_METHODS.POST, {})
    } catch (error) {
      expect(getError(error)).toEqual(fakeErrorResponse)
    }
  })
})
