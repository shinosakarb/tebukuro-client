// @flow
import React from 'react'
import withRedux from 'next-redux-wrapper'
import createStore from '../../store'
import { createEvent } from '../../actions/event'
import EventFormComponent from '../../components/EventForm'

type EventFormProps = {
  createEvent: Function
}

export const NewEvent = (props: EventFormProps) => (
  <div>
    <h3>This is the event form page!</h3>
    <EventFormComponent onSubmit={props.createEvent} />
  </div>
)

const mapDispatchToProps = { createEvent }

const connectProps = {
  createStore,
  mapDispatchToProps,
}

export default withRedux(connectProps)(NewEvent)
