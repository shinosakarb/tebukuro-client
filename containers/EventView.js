// @flow
import React from 'react'
import { connect } from 'react-redux'
import Error from 'next/error'
import { SessionProvider } from '../components/SessionProvider'
import withProvider from '../components/Provider'
import { fetchEvent, registerForEvent, cancelRegistration } from '../actions/event'

import {
  getCurrentEvent,
  getHasWaitlist,
  getHasNotFoundError,
  getUserParticipation,
} from '../selectors/event'
import {
  getParticipants,
  getParticipantMessage,
} from '../selectors/participant'

import EventComponent from '../components/Event'
import ParticipantFormComponent from '../components/ParticipantForm'
import ParticipantsListComponent from '../components/ParticipantsList'
import type { EventId, EventProps, UserParticipation } from '../types/Event'

type Props = {
  url: { query: EventId },
  event: EventProps,
  hasNotFoundError: boolean,
  hasWaitlist: boolean,
  participants: ?Object[],
  participantMessage: string,
  userParticipation: UserParticipation,
  fetchEvent: Function,
  registerForEvent: Function,
  cancelRegistration: Function,
}

class EventView extends React.Component<Props> {
  componentDidMount() {
    const params = { id: this.props.url.query.id }
    this.props.fetchEvent(params)
  }

  render() {
    const { event, userParticipation } = this.props

    return (
      this.props.hasNotFoundError ?
        <Error statusCode="404" />
        :
        <SessionProvider>
          <h3>This is the event page!</h3>
          <EventComponent event={event} />
          <ParticipantFormComponent
            eventId={event.id}
            isUserRegistered={userParticipation.registered}
            hasEventWaitlist={this.props.hasWaitlist}
            isEventWithinDeadline={event.withinDeadline}
            message={this.props.participantMessage}
            onSubmit={this.props.registerForEvent}
            onCancel={this.props.cancelRegistration}
          />
          <ParticipantsListComponent
            participants={this.props.participants}
          />
        </SessionProvider>
    )
  }
}

const mapStateToProps = state => ({
  event: getCurrentEvent(state),
  hasNotFoundError: getHasNotFoundError(state),
  hasWaitlist: getHasWaitlist(state),
  participants: getParticipants(state),
  participantMessage: getParticipantMessage(state),
  userParticipation: getUserParticipation(state),
})

const mapDispatchToProps = {
  fetchEvent,
  registerForEvent,
  cancelRegistration,
}

export default withProvider(connect(mapStateToProps, mapDispatchToProps)(EventView))
