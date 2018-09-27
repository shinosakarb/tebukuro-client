// @flow
import React from 'react'
import Button from '@material/react-button'
import MaterialIcon from '@material/react-material-icon'

type Props = {
  eventId: ?number,
  hasEventWaitlist: boolean,
  onClick: Function,
}

const RegisterButton = (props: { onClick: Function }) => (
  <Button
    icon={<MaterialIcon icon="directions_walk" />}
    onClick={props.onClick}
    outlined
  >
    参加登録
  </Button>
)

const WaitlistedButton = (props: { onClick: Function }) => (
  <Button
    icon={<MaterialIcon icon="playlist_add" />}
    onClick={props.onClick}
    outlined
  >
    キャンセル待ちに登録
  </Button>
)

const ParticipantButton = (props: Props) => {
  const onClickHandler = (e: SyntheticEvent<>) => {
    e.preventDefault()
    props.onClick({ id: props.eventId })
  }

  return (
    <div>
      {props.hasEventWaitlist ?
        <WaitlistedButton onClick={onClickHandler} />
          : <RegisterButton onClick={onClickHandler} />
      }
    </div>
  )
}

export default ParticipantButton
