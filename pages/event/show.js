// @flow
import React, { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import Error from 'next/error'
import createStore from '../../store'
import { fetchEvent } from '../../actions/event'
import type { EventId, EventProps } from '../../types/Event'
import EventComponent from '../../components/Event'

type Props = {
  url: { query: EventId },
  event: EventProps,
  fetchEvent: Function,
}

export class ShowEvent extends Component<Props> {
  componentDidMount() {
    const eventId = this.props.url.query.id
    this.props.fetchEvent(eventId)
  }

  render() {
    if (this.props.event.errors) {
      return <Error statusCode="404" />
    }

    return (
      <div>
        <h3>This is the event page!</h3>
        <EventComponent event={this.props.event} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  event: state.event,
})

const mapDispatchToProps = { fetchEvent }

const connectProps = {
  createStore,
  mapStateToProps,
  mapDispatchToProps,
}

export default withRedux(connectProps)(ShowEvent)
