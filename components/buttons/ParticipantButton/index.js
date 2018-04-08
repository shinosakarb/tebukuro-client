// @flow
import React from 'react'

type Props = {
  eventId: ?number,
  hasEventWaitlist: boolean,
  onClick: Function,
}

const ParticipantButton = (props: Props) => {
  const onClickHandler = (e: SyntheticEvent<>) => {
    e.preventDefault()
    props.onClick({ eventId: props.eventId })
  }

  return (
    <button onClick={onClickHandler}>
      {props.hasEventWaitlist ? 'キャンセル待ちに登録' : '参加登録'}
    </button>
  )
}

export default ParticipantButton
