// @flow
import React from 'react'
import { connect } from 'react-redux'
import EventComponent from '../../components/Event'

export const Event = (props: {event: EventProps}) => (
  <div>
    This is the Event container.
    <EventComponent event={props.event} />
  </div>
)

export default connect(null)(Event)
