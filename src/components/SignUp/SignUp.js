import { Button, InlineNotification, NotificationActionButton, TextInput, Tile } from 'carbon-components-react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { resetError, showError } from '../../state/actions/error-actions'
import { signUpAPI } from '../../state/api/auth-api'
import './SignUp.scss'

class SignUp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userName: '',
      password: '',
      errors: {},
      isSignedUp: false
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
    if (!this.state.firstName) {
      errors.password = 'First name is required'
    }
    if (!this.state.lastName) {
      errors.password = 'Last name is required'
    }
    if (!this.state.email) {
      errors.password = 'Email is required'
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
    })
  }

  async handleSubmit () {
    if (this.validate()) {
      const userDetails = {
        userName: this.state.userName,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password
      }
      try {
        const response = await signUpAPI(userDetails)
        this.setState({ isSignedUp: true })
        console.log(response)
      } catch (error) {
        this.props.showError(error)
      }
    }
  }

  render () {
    const { error, resetError } = this.props
    return (
      <div className='bx--grid'>
        <div className='sign_up_form bx--row'>
          <div className='bx--offset-md-2 bx--offset-lg-5 bx--col-lg-6  bx--col-md-4'>
            <Tile>
              <div className='bx--row'>
                <div className='bx--col-md-8 sign_up_form__notification--success'>
                  {this.state.isSignedUp &&
                    <InlineNotification
                      kind='success'
                      actions={<NotificationActionButton><Link to='/'>Log In</Link></NotificationActionButton>}
                      subtitle={<span>Signed up successfully</span>}
                      title='Success'
                    />}
                </div>
                {!this.state.isSignedUp &&
                  <>
                    <div className='bx--col-md-8'>
                      <h3>Sign Up</h3>
                      <div className='sign_up_form__field--spacing'>Already have an account? <Link to='/'>Log In</Link></div>
                      {error && error.description &&
                        <InlineNotification
                          kind='error'
                          subtitle={error.description}
                          title='Error'
                          onClose={resetError}
                          lowContrast
                        />}
                      <div className='sign_up_form__field--spacing'>
                        <TextInput
                          id='userName'
                          labelText='User name'
                          onChange={(e) => this.handleChange(e.target.id, e.target.value)}
                          invalid={!!this.state.errors.userName}
                          invalidText={this.state.errors.userName}
                        />
                      </div>
                      <div className='sign_up_form__field--spacing'>
                        <TextInput
                          id='firstName'
                          labelText='First name'
                          onChange={(e) => this.handleChange(e.target.id, e.target.value)}
                          invalid={!!this.state.errors.firstName}
                          invalidText={this.state.errors.firstName}
                        />
                      </div>
                      <div className='sign_up_form__field--spacing'>
                        <TextInput
                          id='lastName'
                          labelText='Last name'
                          onChange={(e) => this.handleChange(e.target.id, e.target.value)}
                          invalid={!!this.state.errors.lastName}
                          invalidText={this.state.errors.lastName}
                        />
                      </div>
                      <div className='sign_up_form__field--spacing'>
                        <TextInput
                          id='email'
                          labelText='Email'
                          onChange={(e) => this.handleChange(e.target.id, e.target.value)}
                          invalid={!!this.state.errors.email}
                          invalidText={this.state.errors.email}
                        />
                      </div>
                      <div className='sign_up_form__field--spacing'>
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
                      <Button id='formSubmitBtn' onClick={() => this.handleSubmit()} className='sign_up_form__field--spacing bx--col-md-8 bx--col-sm-4'>
                        <span>Submit</span>
                      </Button>
                    </div>
                  </>}
              </div>
            </Tile>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetError: () => dispatch(resetError()),
    showError: (error) => dispatch(showError(error))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
