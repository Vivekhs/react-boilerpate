import { CustomError, getError } from './error-utils'

describe('Error Utils', () => {
  it('shoule be able to get error object from custom error object', () => {
    const error = {
      message: 'fakeMessage',
      description: 'fakeDescription'
    }
    const customError = new CustomError(error)
    expect(getError(customError)).toEqual(error)
  })
})
