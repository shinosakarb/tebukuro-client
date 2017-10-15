import React, { Component } from 'react'
import { connect }          from 'react-redux'
import EventComponent       from '../../components/Event'
import { showEvent }        from '../../actions/Event'

export class Event extends Component {
  componentDidMount() {
    this.props.showEvent(this.props.eventId)
  }

  render() {
    return (
      <EventComponent event={ this.props.event } />
     )
  }
}

const mapStateToProps = (state) => (
    { event: state.Event.event }
)

export default connect(mapStateToProps, { showEvent })(Event)
