// @flow
import React from 'react'
import withRedux from 'next-redux-wrapper'
import createStore from '../../store'
import { createEvent } from '../../actions/event'
import { getEventErrorsArray } from '../../selectors/event'
import EventFormComponent from '../../components/EventForm'

type EventFormProps = {
  createEvent: Function,
  errors: ?string[]
}

export const NewEvent = (props: EventFormProps) => (
  <div>
    <h3>This is the event form page!</h3>
    { props.errors &&
      <ul>
        { props.errors.map(error =>
          <li>{ error }</li>)}
      </ul>
    }
    <EventFormComponent onSubmit={props.createEvent} />
  </div>
)

const mapDispatchToProps = { createEvent }
const mapStateToProps = state => (
  { errors: getEventErrorsArray(state) }
)

const connectProps = {
  createStore,
  mapStateToProps,
  mapDispatchToProps,
}

export default withRedux(connectProps)(NewEvent)
