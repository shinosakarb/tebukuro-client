// @flow
import React from 'react'
import withRedux from 'next-redux-wrapper'
import createStore from '../../store'
import { createEvent } from '../../actions/event'
import { validateEventForm } from '../../actions/eventForm'
import { getEventErrorsArray } from '../../selectors/event'
import { getValidationErrorMessages, isValidationFailed } from '../../selectors/eventForm'
import EventFormComponent from '../../components/EventForm'

type EventFormProps = {
  createEvent: Function,
  validateEventForm: Function,
  validationErrors: Object,
  validationFailed: boolean,
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
    <EventFormComponent
      onSubmit={props.createEvent}
      onValidation={props.validateEventForm}
      validationErrors={props.validationErrors}
      validationFailed={props.validationFailed}
    />
  </div>
)

const mapDispatchToProps = {
  createEvent,
  validateEventForm,
}
const mapStateToProps = state => ({
  errors: getEventErrorsArray(state),
  validationErrors: getValidationErrorMessages(state),
  validationFailed: isValidationFailed(state),
})

const connectProps = {
  createStore,
  mapStateToProps,
  mapDispatchToProps,
}

export default withRedux(connectProps)(NewEvent)
