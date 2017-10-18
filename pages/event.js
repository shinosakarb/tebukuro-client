// @flow
import React from 'react'
import Event from '../containers/Event'
import type { EventId } from '../types/Event'

export default (props: {url: {query: EventId}}) => (
  <div>
    <h3>This is the event page!</h3>
    <Event eventId={props.url.query.id} />
  </div>
)
