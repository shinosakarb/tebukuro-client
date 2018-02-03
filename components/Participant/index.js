// @flow
import React, { Component } from 'react'

type Props = {
  id: number,
  eventId: number,
  name: string,
  onWaitingList: boolean,
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
    const margin = { marginRight: 10 }
    return (
      <div>
        <span style={margin}>
          { this.props.name }
        </span>
        <span style={margin}>
          { this.props.onWaitingList ?
            'キャンセル待ち' : '参加可能'
          }
        </span>
        <button onClick={this.onCancelHandler} >
          キャンセル
        </button>
      </div>
    )
  }
}
