// @flow
import React from 'react'

const ParticipantList = (props: {participants: ?Object[]}) => (
  <div>
    { props.participants &&
      <ul>
        { props.participants.map(participant =>
          <li key={participant.id}>{ participant.name }</li>)}
      </ul>
    }
  </div>
)

export default ParticipantList
