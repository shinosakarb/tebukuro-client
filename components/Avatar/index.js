// @flow
import React from 'react';
import type { UserType } from '../Auth';

const Avatar = ({ user }: { user: UserType }) => (
  <img src={user.image} alt={user.nickname} width="40" height="40" />
);

export default Avatar;
