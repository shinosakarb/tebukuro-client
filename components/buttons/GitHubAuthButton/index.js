import React from 'react'
import Link from 'next/link'
import { gitHubAuthUrl } from '../../../constants/urls'

const GitHubAuthButton = () => (
  <Link href={gitHubAuthUrl}>
    <a>GitHub auth</a>
  </Link>
)

export default GitHubAuthButton
