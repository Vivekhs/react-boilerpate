import { getStore } from './store'
import { initialAuthState } from './reducers/auth-reducer'
import { initialErrorState } from './reducers/error-reducer'
describe('App Store', () => {
  it('should be able to initialize store', () => {
    const store = getStore()
    const state = store.getState()
    expect(state).toEqual({
      auth: initialAuthState(),
      error: initialErrorState()
    })
  })
})
