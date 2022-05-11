import { resetError, showError } from './error-actions'
describe('Error Actions', () => {
  it('should be able to create showError action', () => {
    expect(showError('fakeError')).toEqual({
      type: 'SHOW_ERROR',
      payload: {
        error: 'fakeError'
      }
    })
  })
  it('should be able to create resetError action', () => {
    expect(resetError()).toEqual({
      type: 'RESET_ERROR',
      payload: {}
    })
  })
})
