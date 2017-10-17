// @flow
import React from 'react'
import Event from '../containers/Event'
import type { QueryId } from '../types/URL'

export default (props: {url: QueryId}) => (
  <div>
    <h3>This is the event page!</h3>
    <Event eventId={props.url.query.id} />
  </div>
)
