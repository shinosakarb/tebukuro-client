// @flow
import React from 'react'
import { connect } from 'react-redux'
import EventFormComponent from '../../components/EventForm'

export const EventForm = () => (
  <div>
    <div>This is the EventForm Container.</div>
    <EventFormComponent onSubmit={() => {}} />
  </div>
)

export default connect(null)(EventForm)
