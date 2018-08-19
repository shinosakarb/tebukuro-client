// @flow
import React from 'react'
import type { ComponentType } from 'react'
import getQueryStringOfWindow from '../../utils/queryString'

type Props = {}

const withQueryString = (Component: ComponentType<*>) =>
  class QueryString extends React.Component<Props> {
    displayName = `withQueryString${Component.displayName || Component.name}`

    setQueryString = () => {
      if (typeof window !== 'undefined') {
        return { url: { query: getQueryStringOfWindow(window) } }
      }
      return {}
    }

    render() {
      return (
        <Component {...this.setQueryString()} />
      )
    }
  }

export default withQueryString

