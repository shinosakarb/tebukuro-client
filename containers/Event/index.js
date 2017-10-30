// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchEvent } from '../../actions/event'
import type { EventId, EventProps } from '../../types/Event'
import EventComponent from '../../components/Event'

type Props = {
  eventId: EventId,
  event: EventProps,
  fetchEvent: Function
}

export class Event extends Component<Props> {
  componentDidMount() {
    this.props.fetchEvent(this.props.eventId)
  }

  render() {
    return (
      <div>
        This is the Event container.
        <EventComponent event={this.props.event} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  event: state.event,
})

export default connect(mapStateToProps, { fetchEvent })(Event)
