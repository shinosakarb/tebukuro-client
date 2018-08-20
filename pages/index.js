// @flow
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Button from '@material/react-button';
import UserInfo from '../components/UserInfo';
import '../styles/style.css';

export default () => (
  <div>
    <Head>
      <link rel="stylesheet" href="/_next/static/style.css" />
    </Head>
    <UserInfo />
    <div>Welcome to Tebukuro</div>
    <Button>
      <Link href="event/new">
        <a>Create a new event</a>
      </Link>
    </Button>
  </div>
);
