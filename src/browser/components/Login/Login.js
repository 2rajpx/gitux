import React, { Component } from 'react'
import { connect } from 'react-redux'

import { authorize } from '../../actions/auth-actions'

class Login extends Component {
  componentDidMount() {
    const accessToken  = this.props.location.query.access_token
    if (accessToken) {
      this.props.authorize(accessToken)
    }
  }
  render() {
    return null
  }
}

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  authorize: accessToken => dispatch(authorize(accessToken)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
