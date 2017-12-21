// @flow
import React from 'react'
import Link from 'next/link'
import Page from '../layouts/Main'

export default () => (
  <Page>
    <div>Welcome to Tebukuro</div>
    <Link href="event/new">
      <a>Create a new event</a>
    </Link>
  </Page>
)
