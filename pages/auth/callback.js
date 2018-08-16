// @flow
import React, { Component } from 'react'
import Router from 'next/router'
import { setAuthInfo, getAuthParams } from '../../utils/auth'
import type { AuthInfo, AuthQueryParams } from '../../utils/auth'

type Props = {}

const getAuthInfoFrom = (queryStrings: String): AuthInfo => {
  // Removing '?' in the head of string.
  const query = queryStrings.slice(1).split('&').reduce((info, queryString) => {
    const keyValue = queryString.split('=')
    return Object.assign(info, { [keyValue[0]]: keyValue[1] })
  }, {})

  return {
    accessToken: query.auth_token,
    clientId: query.client_id,
    uid: query.uid,
  }
}

export default class AuthCallback extends Component<Props> {
  // getInitialProps doesn't work when exported as static html.
  static async getInitialProps(ctx: { query: AuthQueryParams }) {
    return ctx.query ? {
      authInfo: getAuthParams(ctx.query),
    } : {}
  }

  componentDidMount() {
    const authInfo = getAuthInfoFrom(window.location.search)
    setAuthInfo(authInfo)
    Router.replace('/')
  }

  render() {
    return <div>Loading...</div>
  }
}
