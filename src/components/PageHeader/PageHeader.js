import { Logout20, UserAvatarFilledAlt20 } from '@carbon/icons-react'
import {
  Header,
  HeaderContainer, HeaderGlobalAction, HeaderGlobalBar,
  HeaderName
} from 'carbon-components-react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import { userLogout } from '../../state/actions/auth-actions'
import './PageHeader.scss'

class PageHeader extends Component {
  render () {
    const { logout, history } = this.props
    return (
      <div className='header-container'>
        <HeaderContainer
          render={() => (
            <Header aria-label='UI Demo'>
              <HeaderName prefix=''>
                <span onClick={() => history.push('/home')}>UI Demo</span>
              </HeaderName>
              <HeaderGlobalBar>
                <HeaderGlobalAction aria-label='Profile'>
                  <UserAvatarFilledAlt20 />
                </HeaderGlobalAction>
                <HeaderGlobalAction aria-label='Logout' onClick={logout}>
                  <Logout20 />
                </HeaderGlobalAction>

              </HeaderGlobalBar>
            </Header>
          )}
        />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(userLogout())
  }
}

export default compose(withRouter, connect(null, mapDispatchToProps))(PageHeader)
