// @flow
import React, { Component } from 'react'
import Router from 'next/router'
import { setAuthInfo } from '../../utils/session'

type Props = {
  authInfo: {
    accessToken: string,
    clientId: string,
    uid: string,
  }
}

export default class AuthCallback extends Component<Props> {
  static async getInitialProps(ctx) {
    if (ctx.query) {
      return {
        authInfo: {
          accessToken: ctx.query.auth_token,
          clientId: ctx.query.client_id,
          uid: ctx.query.uid,
        },
      }
    }
    return {}
  }

  componentDidMount() {
    setAuthInfo(this.props.authInfo)
    Router.replace('/')
  }

  render() {
    return <div>Loading...</div>
  }
}
