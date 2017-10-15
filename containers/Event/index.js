import React, { Component } from 'react'
import { connect }          from 'react-redux'

export class Event extends Component {
  render() {
    return (
      <div>This is the Event container.</div>
     )
  }
}

export default connect(null)(Event)
