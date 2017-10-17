// @flow
import React from 'react'

const Event = (props: {event: EventProps}) => (
  <div>
    <p>name: {props.event.name}</p>
    <p>description: {props.event.description}</p>
  </div>
)

export default Event
