// @flow
import React from 'react'
import { connect } from 'react-redux'
import { createEvent } from '../../actions/Event/event'
import EventFormComponent from '../../components/EventForm'

type EventFormProps = {
  createEvent: Function
}

export const EventForm = (props: EventFormProps) => (
  <div>
    <div>This is the EventForm Container.</div>
    <EventFormComponent onSubmit={props.createEvent} />
  </div>
)

export default connect(null, { createEvent })(EventForm)
