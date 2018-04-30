// @flow
import React from 'react'
import type { ComponentType } from 'react'
import { getUserInfo } from '../../utils/auth'
import Loading from '../Loading'

export type UserType = {
  image: string,
  nickname: string,
}

export type SessionType = {
  isSignedIn: boolean,
  user: UserType | Object,
}

type Props = {}

type State = {
  isLoading: boolean,
  session: SessionType,
}

const withAuth = (Component: ComponentType<*>) =>
  class Auth extends React.Component<Props, State> {
    displayName = `withAuth${Component.displayName || Component.name}`

    state = {
      isLoading: true,
      session: {
        isSignedIn: false,
        user: {},
      },
    }

    componentDidMount() {
      this.setSession()
    }

    setSession = () => {
      const user = getUserInfo()
      this.setState({
        isLoading: false,
        session: {
          isSignedIn: !!user,
          user: user || {},
        },
      })
    }

    render() {
      return (
        <div>
          { this.state.isLoading ? (
            <Loading />
          ) : (
            <Component {...this.props} {...this.state} session={this.state.session} />
          )}
        </div>
      )
    }
  }

export default withAuth
