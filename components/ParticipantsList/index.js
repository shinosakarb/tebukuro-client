// @flow
import React from 'react'
import MaterialIcon from '@material/react-material-icon'
import ParticipantComponent from '../Participant'

type Props = {
  participants: ?Object[],
}

const ParticipantsList = (props: Props) => (
  <div>
    { props.participants &&
    <ul className="mdc-list">
      { props.participants.map(participant => (
        <li className="mdc-list-item" key={participant.id}>
          <MaterialIcon icon="account_circle" />
          <ParticipantComponent {...participant} />
        </li>
        ))}
    </ul>
    }
  </div>
)

export default ParticipantsList
