import React, { Component } from 'react'
import { connect }          from 'react-redux'
import EventComponent       from '../../components/Event'

export class Event extends Component {
  render() {
    return (
      <div>
        This is the Event container.
        <EventComponent event={ this.props.event } />
      </div>
    )
  }
}

export default connect(null)(Event)
