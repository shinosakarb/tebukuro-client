// @flow
import React from 'react'
import ParticipantButton from '../buttons/ParticipantButton'
import CancelRegistrationButton from '../buttons/CancelRegistrationButton'

type Props = {
  eventId: ?number,
  isSignedIn: boolean,
  isUserRegistered: boolean,
  hasEventWaitlist: boolean,
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
      { props.isSignedIn &&
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
    }
    </div>
  )
}

export default ParticipantForm
