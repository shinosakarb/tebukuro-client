// @flow
import React from 'react'
import Link from 'next/link'
import UserInfo from '../components/UserInfo'

export default () => (
  <div>
    <UserInfo />
    <div>Welcome to Tebukuro</div>
    <Link href="event/new">
      <a>Create a new event</a>
    </Link>
  </div>
)
