// @flow
import React from 'react'
import EventContainer from '../../containers/Event'
import type { EventId } from '../../types/Event'

export default (props: {url: {query: EventId}}) => (
  <div>
    <h3>This is the event page!</h3>
    <EventContainer eventId={props.url.query.id} />
  </div>
)
