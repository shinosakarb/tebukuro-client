// @flow
import React from 'react'
import ParticipantButton from '../buttons/ParticipantButton'
import CancelRegistrationButton from '../buttons/CancelRegistrationButton'

type Props = {
  eventId: ?number,
  hasEventWaitlist: boolean,
  isUserRegistered: boolean,
  message: string,
  onSubmit: Function,
  onCancel: Function,
}

const ParticipantForm = (props: Props) => {
  const {
    eventId, onSubmit, onCancel, hasEventWaitlist,
  } = props

  return (
    <div>
      <p> { props.message } </p>
      { props.isUserRegistered ?
        <CancelRegistrationButton
          eventId={eventId}
          onClick={onCancel}
        /> :
        <ParticipantButton
          eventId={eventId}
          hasEventWaitlist={hasEventWaitlist}
          onClick={onSubmit}
        />
      }
    </div>
  )
}

export default ParticipantForm
