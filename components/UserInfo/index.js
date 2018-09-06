// @flow
import React from "react";
import withAuth from "../Auth";
import type { SessionType } from "../Auth";
import Avatar from "../Avatar";
import GitHubAuthButton from "../buttons/GitHubAuthButton";
import Fab from "@material/react-fab";

const UserInfo = ({ session }: { session: SessionType }) => (
  <div>
    {session.isSignedIn ? (
      <Fab icon={<Avatar user={session.user} />} mini={true} />
    ) : (
      <GitHubAuthButton />
    )}
  </div>
);

export default withAuth(UserInfo);
