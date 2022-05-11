import { Component, lazy, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import './App.scss'
import Login from './components/Login/Login'
import PageLoader from './components/PageLoader/PageLoader'
import SignUp from './components/SignUp/SignUp'
const Home = lazy(() => import('./components/Home/Home'))

const PrivateRoute = ({ component: Component, ...args }) => (
  <Route
    {...args} render={(props) => (
      args.isLoggedIn
        ? <Component {...props} />
        : <Redirect to={{
          pathname: '/',
          state: { from: props.location.pathname }
        }}
          />
    )}
  />
)

class App extends Component {
  render () {
    const { isLoggedIn } = this.props
    return (
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path='/' component={Login} exact />
          <Route path='/login' component={Login} />
          <Route path='/sign_up' component={SignUp} />
          <PrivateRoute path='/home' isLoggedIn={isLoggedIn} component={Home} />
          <PrivateRoute path='/home2' isLoggedIn={isLoggedIn} component={Home} />
          <Route>
      <Redirect to="/" />
    </Route>
        </Switch>
      </Suspense>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  }
}
export default connect(mapStateToProps)(App)
