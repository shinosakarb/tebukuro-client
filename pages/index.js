// @flow
import React from 'react'
import Link from 'next/link'

export default () => (
  <div>
    <div>Welcome to Tebukuro</div>
    <Link href="event/new">
      <a>Create a new event</a>
    </Link>
  </div>
)
