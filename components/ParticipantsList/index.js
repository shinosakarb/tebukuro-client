// @flow
import React from 'react'
import ParticipantComponent from '../Participant'

type Props = {
  participants: ?Object[],
  onCancel: Function,
}

const ParticipantsList = (props: Props) => (
  <div>
    { props.participants &&
      <ul>
        { props.participants.map(participant => (
          <li key={participant.id}>
            <ParticipantComponent {...participant} onCancel={props.onCancel} />
          </li>
        ))}
      </ul>
    }
  </div>
)

export default ParticipantsList
