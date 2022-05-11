import { Button, InlineNotification, TextInput, Tile } from 'carbon-components-react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { userLogin } from '../../state/actions/auth-actions'
import { resetError } from '../../state/actions/error-actions'

import './Login.scss'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userName: '',
      password: '',
      errors: {}
    }
  }

  validate () {
    const errors = {}
    if (!this.state.userName) {
      errors.userName = 'user name is required'
    }
    if (!this.state.password) {
      errors.password = 'password is required'
    }
    this.setState({ errors })
    if (Object.keys(errors).length) {
      return false
    }
    return true
  }

  handleChange (key, value) {
    this.setState({
      [key]: value
    }, this.validate)
  }

  handleSubmit (event) {
    event.preventDefault()
    if (this.validate()) {
      this.props.login(this.state.userName, this.state.password)
    }
  }

  render () {
    const { error, isLoggedIn, resetError, location } = this.props
    if (isLoggedIn) {
      resetError()

      return <Redirect to={(location && location.state  && location.state.from) || '/home'} />
    }
    return (
      <div className='bx--grid'>
        <div className='login_form bx--row'>
          <form onSubmit={(e) => this.handleSubmit(e)} className='bx--offset-md-2 bx--offset-lg-5 bx--col-lg-6  bx--col-md-4'>
            <Tile>
              <div className='bx--row'>
                <div className='bx--col-md-8'>
                  <h3>Log in</h3>
                  <div className='login_form__field--spacing'>Don't have an account? <Link to='/sign_up'>Sign up</Link></div>
                  {error && error.description &&
                    <InlineNotification
                      kind='error'
                      subtitle={error.description}
                      title='Error'
                      onClose={resetError}
                      lowContrast
                    />}
                  <div className='login_form__field--spacing'>
                    <TextInput
                      id='userName'
                      labelText='User name'
                      onChange={(e) => this.handleChange(e.target.id, e.target.value)}
                      invalid={!!this.state.errors.userName}
                      invalidText={this.state.errors.userName}
                    />
                  </div>
                  <div className='login_form__field--spacing'>
                    <TextInput
                      id='password'
                      type='password'
                      labelText='Password'
                      onChange={(e) => this.handleChange(e.target.id, e.target.value)}
                      invalid={!!this.state.errors.password}
                      invalidText={this.state.errors.password}
                    />
                  </div>
                </div>
                <div className='bx--offset-md-4 bx--offset-sm-2 bx--offset-lg-9 bx--col'>
                  <Button type="submit" id='formSubmitBtn' className='login_form__field--spacing bx--col-md-8 bx--col-sm-4'>
                    <span>Log in</span>
                  </Button>
                </div>
              </div>
            </Tile>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    error: state.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (userName, password) => dispatch(userLogin(userName, password)),
    resetError: () => dispatch(resetError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
