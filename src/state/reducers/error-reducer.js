import { handleActions } from 'redux-actions'
import { getError } from '../../utils/error-utils'

export const initialErrorState = () => ({
  message: '',
  description: ''
})

export const errorReducer = handleActions(
  {
    SHOW_ERROR: (state, action) => ({
      ...state,
      ...getError(action.payload)
    }),
    RESET_ERROR: (state) => ({
      ...state,
      ...initialErrorState()
    })
  },
  initialErrorState()
)
