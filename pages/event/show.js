// @flow
import React from 'react'
import EventView from '../../containers/EventView'
import withQueryString from '../../components/QueryString'

type Props = {
  url: Object
}

const EventShowPage = (props: Props) => <EventView url={props.url} />

export default withQueryString(EventShowPage)
