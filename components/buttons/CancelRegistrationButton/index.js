// @flow
import React from 'react'

type Props = {
  eventId: ?number,
  onClick: Function,
}

export default (props: Props) => {
  const onClickHandler = (e: SyntheticEvent<>) => {
    e.preventDefault()
    props.onClick({ eventId: props.eventId })
  }

  return (
    <button onClick={onClickHandler}>
      登録をキャンセルする
    </button>
  )
}
