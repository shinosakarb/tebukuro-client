// @flow
import React from 'react'
import Button from '@material/react-button'
import MaterialIcon from '@material/react-material-icon'

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
    <Button
      icon={<MaterialIcon icon="cancel" />}
      onClick={onClickHandler}
      outlined
    >
      登録をキャンセルする
    </Button>
  )
}

export default CancelRegistrationButton
