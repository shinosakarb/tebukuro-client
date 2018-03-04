// @flow
import React from 'react'
import { connect } from 'react-redux'
import withProvider from '../components/Provider'
import EventFormComponent from '../components/EventForm'
import { createEvent } from '../actions/event'
import { validateEventForm } from '../actions/eventForm'
import { getEventErrorsArray } from '../selectors/event'
import { getValidationErrorMessages, isValidationFailed } from '../selectors/eventForm'

type EventFormProps = {
  createEvent: Function,
  validateEventForm: Function,
  validationErrors: Object,
  validationFailed: boolean,
  errors: ?string[]
}

const EventRegistration = (props: EventFormProps) => (
  <div>
    <h3>This is the event form page!</h3>
    { props.errors && (
      <ul>
        { props.errors.map(error =>
          <li>{ error }</li>)}
      </ul>
    ) }
    <EventFormComponent
      onSubmit={props.createEvent}
      onValidation={props.validateEventForm}
      validationErrors={props.validationErrors}
      validationFailed={props.validationFailed}
    />
  </div>
)

const mapStateToProps = state => ({
  errors: getEventErrorsArray(state),
  validationErrors: getValidationErrorMessages(state),
  validationFailed: isValidationFailed(state),
})

const mapDispatchToProps = {
  createEvent,
  validateEventForm,
}

export default withProvider(connect(mapStateToProps, mapDispatchToProps)(EventRegistration))
