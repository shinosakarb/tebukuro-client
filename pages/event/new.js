// @flow
import React from 'react'
import withRedux from 'next-redux-wrapper'
import initStore from '../../store'

export const EventForm = () => (
  <div>
    <h3>This is the event form page!</h3>
  </div>
)

export default withRedux(initStore)(EventForm)
