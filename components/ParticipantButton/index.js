// @flow
import React from 'react'

type Props = {
  hasEventWaitlist: boolean,
}

const ParticipantButton = (props: Props) => (
  <input
    type="submit"
    value={props.hasEventWaitlist ? 'キャンセル待ちに登録' : '参加登録'}
  />
)

export default ParticipantButton
