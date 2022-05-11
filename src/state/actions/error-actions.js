import { createActions } from 'redux-actions'

export const { showError, resetError } = createActions({
  SHOW_ERROR: error => ({ error }),
  RESET_ERROR: () => ({})
})
