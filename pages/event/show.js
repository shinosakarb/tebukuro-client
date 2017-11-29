// @flow
import React, { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import Error from 'next/error'
import createStore from '../../store'
import { fetchEvent, joinEvent } from '../../actions/event'
import type { EventId, EventProps } from '../../types/Event'
import EventComponent from '../../components/Event'
import ParticipantFormComponent from '../../components/ParticipantForm'

type Props = {
  url: { query: EventId },
  event: EventProps,
  fetchEvent: Function,
  joinEvent: Function,
}

export class ShowEvent extends Component<Props> {
  componentDidMount() {
    const eventId = this.props.url.query.id
    this.props.fetchEvent(eventId)
  }

  isNotFoundError(errors: ?string[]) {
    return errors && errors[0] === 'Not Found'
  }

  render() {
    const { event } = this.props
    if (this.isNotFoundError(event.errors)) {
      return <Error statusCode="404" />
    }

    return (
      <div>
        { event.errors &&
          <ul>
            { event.errors.map(error => <li>{ error }</li>) }
          </ul>
        }
        <h3>This is the event page!</h3>
        <EventComponent event={event} />
        <ParticipantFormComponent
          onSubmit={this.props.joinEvent}
          eventId={this.props.event.id}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  event: state.event,
})

const mapDispatchToProps = { fetchEvent, joinEvent }

const connectProps = {
  createStore,
  mapStateToProps,
  mapDispatchToProps,
}

export default withRedux(connectProps)(ShowEvent)
