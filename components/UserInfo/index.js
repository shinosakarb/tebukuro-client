// @flow
import React from 'react';
import Fab from '@material/react-fab';
import withAuth from '../Auth';
import type { SessionType } from '../Auth';
import Avatar from '../Avatar';

import GitHubAuthButton from '../buttons/GitHubAuthButton';

const UserInfo = ({ session }: { session: SessionType }) => (
  <div>
    {session.isSignedIn ? <Fab icon={<Avatar user={session.user} />} mini /> : <GitHubAuthButton />}
  </div>
);

export default withAuth(UserInfo);
