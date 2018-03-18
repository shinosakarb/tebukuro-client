// @flow
import React from 'react'

type Props = {
  eventId: ?number,
  hasEventWaitlist: boolean,
  message: string,
  onSubmit: Function,
}

export default (props: Props) => {
  const onClickHandler = (e: SyntheticEvent<>) => {
    e.preventDefault()
    props.onSubmit({ eventId: props.eventId })
  }

  return (
    <div>
      <p> { props.message } </p>
      <input
        type="button"
        value={props.hasEventWaitlist ? 'キャンセル待ちに登録' : 'このイベントに参加する'}
        onClick={onClickHandler}
      />
    </div>
  )
}
