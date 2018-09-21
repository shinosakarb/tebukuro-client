// @flow
import React from 'react'
import EventView from '../../containers/EventView'
import withLayout from '../../components/Layout'
import withQueryString from '../../components/QueryString'

type Props = {
  url: Object
}

const EventShowPage = (props: Props) => <EventView url={props.url} />

export default withLayout(withQueryString(EventShowPage))
