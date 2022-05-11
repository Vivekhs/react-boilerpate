import { CustomError } from '../../utils/error-utils'
import { errorReducer, initialErrorState } from './error-reducer'

describe('Error Reducer', () => {
  it('should be able to set intial state', () => {
    const state = errorReducer(undefined, {})
    expect(state).toEqual(initialErrorState())
  })
  it('should be able to update error state to show an error', () => {
    const error = {
      message: 'fakeMessage',
      description: 'fakeDesc'
    }
    const state = errorReducer(initialErrorState(), {
      type: 'SHOW_ERROR',
      payload: new CustomError(error)
    })
    expect(state).toEqual(error)
  })

  it('should be able to reset error state to hide an error', () => {
    const error = {
      message: 'fakeMessage',
      description: 'fakeDesc'
    }

    const state = errorReducer(error, {
      type: 'RESET_ERROR',
      payload: {}
    })
    expect(state).toEqual(initialErrorState())
  })
})
