import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'
import rootReducer from './reducers'

export const getStore = () => createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)))
