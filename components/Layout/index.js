// @flow
import React from 'react'
import type { ComponentType } from 'react'
import TopAppBar from '@material/react-top-app-bar'
import MaterialIcon from '@material/react-material-icon'
import UserInfo from '../UserInfo'
import Head from '../Head';
import '../../styles/style.css'

type Props = {}

const withLayout = (Component: ComponentType<*>) => (props: Props) => (
  <div>
    <Head />
    <TopAppBar
      title="Tebukuro"
      navigationIcon={<MaterialIcon icon="thumb_up" />}
      actionItems={[<UserInfo />]}
    />
    <div className="mdc-top-app-bar--fixed-adjust home-component">
      <Component {...props} />
    </div>
  </div>
)

export default withLayout
