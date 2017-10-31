// @flow
import React from 'react'
import withRedux from 'next-redux-wrapper'
import initStore from '../../store'
import Event from '../../containers/Event'
import type { EventId } from '../../types/Event'

const EventPage = (props: {url: {query: EventId}}) => (
  <div>
    <h3>This is the event page!</h3>
    <Event eventId={props.url.query.id} />
  </div>
)

export default withRedux(initStore)(EventPage)
