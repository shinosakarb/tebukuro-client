// @flow
import React from 'react'
import type { EventProps } from '../../types/Event'

const Event = (props: {event: EventProps}) => (
  <div>
    <p>name: {props.event.name}</p>
    <p>description: {props.event.description}</p>
  </div>
)

export default Event
