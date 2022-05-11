import { mount, shallow } from 'enzyme'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { BrowserRouter } from 'react-router-dom'

export const mountWithProvider = (Component, props, store) => {
  return mount(<Provider store={store}><Component {...props} /></Provider>)
}

export const mountWithRouter = (Component, props, history) => {
  return mount(<Router history={history}><Component {...props} /></Router>)
}

export const mountWithRouterAndProvider = (Component, props, store, history) => {
  return mount(<Router history={history}><Provider store={store}><Component {...props} /></Provider></Router>)
}

export const mountWithBrowserRouterAndProvider = (Component, props, store) => {
  return mount(<BrowserRouter><Provider store={store}><Component {...props} /></Provider></BrowserRouter>)
}

export const shallowWithProvider = (Component, props, store) => {
  return shallow(<Provider store={store}><Component {...props} /></Provider>)
}

export const shallowWithRouterAndProvider = (Component, props, store, history) => {
  return shallow(<Router history={history}><Provider store={store}><Component {...props} /></Provider></Router>)
}
