// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import type { EventProps } from '../../types/Event'
import EventComponent from '../../components/Event'
import { fetchEvent } from '../../actions/event'

type Props = {
  eventId: number,
  event: EventProps,
  fetchEvent: Function
}

export class EventContainer extends Component<Props> {
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

const mapStateToProps = state => ({ event: state.event })

export default connect(mapStateToProps, { fetchEvent })(EventContainer)
