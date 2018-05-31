// @flow
import React from 'react'

import { toggleComponentsBySession } from '../SessionProvider'

import AfterDeadline from '../AfterDeadline'
import ParticipantButton from '../buttons/ParticipantButton'
import CancelRegistrationButton from '../buttons/CancelRegistrationButton'

type Props = {
  eventId: ?number,
  isUserRegistered: boolean,
  hasEventWaitlist: boolean,
  message: string,
  onSubmit: Function,
  onCancel: Function,
}

export const ParticipantForm = (props: Props) => {
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

ParticipantForm.displayName = 'ParticipantForm'

const ParticipantFormWithDeadline = ({ isEventWithinDeadline, ...props }: any) => (
  <div>
    { isEventWithinDeadline ? <ParticipantForm {...props} /> : <AfterDeadline /> }
  </div>
)

ParticipantFormWithDeadline.displayName = 'ParticipantFormWithDeadline'

const ParticipantFormWithSession =
  toggleComponentsBySession(ParticipantFormWithDeadline, () => <div />)

export default ParticipantFormWithSession
