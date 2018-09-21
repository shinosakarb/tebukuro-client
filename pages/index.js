// @flow
import React from 'react'
import Link from 'next/link'
import Button from '@material/react-button'
import withLayout from '../components/Layout'

const TopPage = () => (
  <div>
    <h1 className="mdc-typography--headline2">Welcome to Tebukuro</h1>

    <div className="home-list">
      <ul className="mdc-list">
        <li className="mdc-list-item">
          <Link href="event/new">
            <Button>
              <h1 className="mdc-typography--headline6">Create a new event</h1>
            </Button>
          </Link>
        </li>
      </ul>
    </div>
  </div>
)

export default withLayout(TopPage)
