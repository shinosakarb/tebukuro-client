// @flow
import React from 'react'

type Props = {
  eventId: ?number,
  onClick: Function,
}

const CancelRegistrationButton = (props: Props) => {
  const onClickHandler = (e: SyntheticEvent<>) => {
    e.preventDefault()
    props.onClick({ id: props.eventId })
  }

  return (
    <button onClick={onClickHandler}>
      登録をキャンセルする
    </button>
  )
}

export default CancelRegistrationButton
