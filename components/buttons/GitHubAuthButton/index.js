import React from 'react'
import Link from 'next/link'
import { gitHubAuthUrl } from '../../../constants/urls'

export default () => (
  <Link href={gitHubAuthUrl}>
    <a>GitHub auth</a>
  </Link>
)
