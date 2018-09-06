import React from "react";
import Button from "@material/react-button";
import MaterialIcon from "@material/react-material-icon";
import { gitHubAuthUrl } from "../../../constants/urls";

const GitHubAuthButton = () => (
  <Button
    icon={<MaterialIcon icon="pets" />}
    raised={true}
    href={gitHubAuthUrl}
  >
    GitHub auth
  </Button>
);

export default GitHubAuthButton;
