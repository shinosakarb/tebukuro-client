// @flow
import React from 'react'
import withRedux from 'next-redux-wrapper'
import initStore from '../../store'
import EventFormContainer from '../../containers/EventForm'

const EventFormPage = () => (
  <div>
    <h3>This is the event form page!</h3>
    <EventFormContainer />
  </div>
)

export default withRedux(initStore)(EventFormPage)
