import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { navigateToLogin } from '../../actions/panel-actions'

class Panel extends Component {
  componentDidMount() {
    if (!this.props.isLoggedIn) {
      // set the current url/path for future redirection (we use a Redux action)
      // then redirect (we use a React Router method)
      this.props.navigateToLogin()
    }
  }

  render() {
    // const bindedActionCreators = bindActionCreators(actions, dispatch)
    if (this.props.isLoggedIn) {
      return this.props.children
    } else {
      return null
    }
  }
}

// Grab a reference to the current URL. If this is a web app and you are
// using React Router, you can use `ownProps` to find the URL. Other
// platforms (Native) or routing libraries have similar ways to find
// the current position in the app.

const mapStateToProps = (state, ownProps) => ({
  isLoggedIn: state.auth.isLoggedIn,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateToLogin: () => dispatch(navigateToLogin(ownProps.location.pathname)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Panel)
