import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import EventComponent from '../../components/Event'

export const Event = props => (
  <div>
    This is the Event container.
    <EventComponent event={props.event} />
  </div>
)

Event.propTypes = { event: PropTypes.instanceOf(Object).isRequired }

export default connect(null)(Event)
