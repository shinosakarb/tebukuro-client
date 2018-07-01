// @flow
import React from 'react'
import type { ComponentType } from 'react'
import type { SessionType } from '../Auth'
import withAuth from '../Auth'

const { Provider, Consumer } = React.createContext()

type ProviderType = {
  session: SessionType,
  children: ComponentType<*>
}

const withSessionProvider = (props: ProviderType) => (
  <Provider value={props.session}>
    {props.children}
  </Provider>
)

export const toggleComponentsBySession =
  (SignedInComponent: ComponentType<*>, NotSignedInComponent: ComponentType<*>) => (
    (props: any) => (
      <Consumer>
        { (session: any) => (
        session.isSignedIn ?
          <SignedInComponent {...props} /> : <NotSignedInComponent {...props} />
      ) }
      </Consumer>
    )
  )

export const SessionProvider = withAuth(withSessionProvider)
