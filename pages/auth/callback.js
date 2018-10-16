// @flow
import React, { Component } from 'react'
import withQueryString from '../../components/QueryString'
import { setAuthInfo, getAuthParams } from '../../utils/auth'
import type { AuthQueryParams } from '../../utils/auth'

type Props = { url: { query: Object } }

class AuthCallback extends Component<Props> {
  // getInitialProps doesn't work when exported as static html.
  static async getInitialProps(ctx: { query: AuthQueryParams }) {
    return ctx.query ? {
      authInfo: getAuthParams(ctx.query),
    } : {}
  }

  async componentDidMount() {
    const authInfo = getAuthParams(this.props.url.query)
    await setAuthInfo(authInfo)
    window.location.href = '/'
  }

  render() {
    return <div>Loading...</div>
  }
}

export default withQueryString(AuthCallback)
