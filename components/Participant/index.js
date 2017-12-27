// @flow
import React, { Component } from 'react'

type Props = {
  id: number,
  eventId: number,
  name: string,
  onCancel: Function,
}

export default class Participant extends Component<Props> {
  onCancelHandler = () => {
    this.props.onCancel({
      id: this.props.id,
      eventId: this.props.eventId,
    })
  }

  render() {
    return (
      <div>
        { this.props.name }
        <button onClick={this.onCancelHandler} >
          cancel
        </button>
      </div>
    )
  }
}
