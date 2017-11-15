// @flow
import React from 'react'
import withRedux from 'next-redux-wrapper'
import initStore from '../../store'

export const Event = () => (
  <div>
    <h3>This is the event page!</h3>
  </div>
)

export default withRedux(initStore)(Event)
