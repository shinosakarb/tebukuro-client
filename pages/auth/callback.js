// @flow
import React, { Component } from 'react'
import Router from 'next/router'
import { setAuthInfo, getAuthParams } from '../../utils/auth'
import type { AuthInfo, AuthQueryParams } from '../../utils/auth'

type Props = {
  authInfo: AuthInfo,
}

export default class AuthCallback extends Component<Props> {
  static async getInitialProps(ctx: { query: AuthQueryParams }) {
    return ctx.query ? {
      authInfo: getAuthParams(ctx.query),
    } : {}
  }

  componentDidMount() {
    setAuthInfo(this.props.authInfo)
    Router.replace('/')
  }

  render() {
    return <div>Loading...</div>
  }
}
