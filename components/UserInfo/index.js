// @flow
import React from 'react'
import withAuth from '../Auth'
import type { SessionType } from '../Auth'
import Avatar from '../Avatar'
import GitHubAuthButton from '../buttons/GitHubAuthButton'

const UserInfo = ({ session }: { session: SessionType }) => (
  <div>
    {session.isSignedIn ? (
      <p>
        <Avatar user={session.user} />
        {session.user.nickname}
      </p>
    ) : (
      <GitHubAuthButton />
    )}
  </div>
)

export default withAuth(UserInfo)
