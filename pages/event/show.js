// @flow
import React, { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import Error from 'next/error'
import createStore from '../../store'
import { fetchEvent, registerForEvent } from '../../actions/event'
import { getCurrentEvent } from '../../selectors/event'
import { getParticipantErrorsArray } from '../../selectors/participant'
import EventComponent from '../../components/Event'
import ParticipantFormComponent from '../../components/ParticipantForm'
import type { EventId, EventProps } from '../../types/Event'

type Props = {
  url: { query: EventId },
  event: EventProps,
  participantErrors: ?string[],
  fetchEvent: Function,
  registerForEvent: Function,
}

export class ShowEvent extends Component<Props> {
  componentDidMount() {
    const params = { id: this.props.url.query.id }
    this.props.fetchEvent(params)
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
        <h3>This is the event page!</h3>
        <EventComponent event={event} />
        <ParticipantFormComponent
          onSubmit={this.props.registerForEvent}
          eventId={event.id}
          errors={this.props.participantErrors}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  event: getCurrentEvent(state),
  participantErrors: getParticipantErrorsArray(state),
})

const mapDispatchToProps = { fetchEvent, registerForEvent }

const connectProps = {
  createStore,
  mapStateToProps,
  mapDispatchToProps,
}

export default withRedux(connectProps)(ShowEvent)
