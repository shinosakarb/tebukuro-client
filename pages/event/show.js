// @flow
import React, { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import Error from 'next/error'
import createStore from '../../store'
import { fetchEvent, registerForEvent, cancelRegistration } from '../../actions/event'
import { getCurrentEvent, getHasWaitlist, getHasNotFoundError } from '../../selectors/event'
import { getParticipants, getParticipantErrorsArray } from '../../selectors/participant'
import EventComponent from '../../components/Event'
import ParticipantFormComponent from '../../components/ParticipantForm'
import ParticipantsListComponent from '../../components/ParticipantsList'
import type { EventId, EventProps } from '../../types/Event'

type Props = {
  url: { query: EventId },
  event: EventProps,
  hasNotFoundError: boolean,
  hasWaitlist: boolean,
  participants: ?Object[],
  participantErrors: ?string[],
  fetchEvent: Function,
  registerForEvent: Function,
  cancelRegistration: Function,
}

export class ShowEvent extends Component<Props> {
  componentDidMount() {
    const params = { id: this.props.url.query.id }
    this.props.fetchEvent(params)
  }

  render() {
    const { event } = this.props

    if (this.props.hasNotFoundError) {
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
          hasEventWaitlist={this.props.hasWaitlist}
        />
        <ParticipantsListComponent
          participants={this.props.participants}
          onCancel={this.props.cancelRegistration}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  event: getCurrentEvent(state),
  hasNotFoundError: getHasNotFoundError(state),
  hasWaitlist: getHasWaitlist(state),
  participants: getParticipants(state),
  participantErrors: getParticipantErrorsArray(state),
})

const mapDispatchToProps = { fetchEvent, registerForEvent, cancelRegistration }

const connectProps = {
  createStore,
  mapStateToProps,
  mapDispatchToProps,
}

export default withRedux(connectProps)(ShowEvent)
