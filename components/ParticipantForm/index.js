// @flow
import React, { Component } from 'react'
import ParticipantButton from '../buttons/ParticipantButton'
import TextInput from '../forms/TextInput'

type Props = {
  onSubmit: Function,
  hasEventWaitlist: boolean,
  eventId: ?number,
  errors: ?string[],
  message: string,
}
type State = {
  name: string,
  eventId: ?number,
}

export default class ParticipantForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      name: '',
      eventId: props.eventId,
    }
  }

  onChangeHandler = (e: SyntheticInputEvent<>) => {
    this.setState({
      ...this.state,
      [e.target.id]: e.target.value,
    })
  }

  onSubmitHandler = (e: SyntheticEvent<>) => {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }

  render() {
    return (
      <div>
        <h3>Event participation form</h3>
        { this.props.errors &&
          <ul>
            { this.props.errors.map(error =>
              <li>{ error }</li>)}
          </ul>
        }
        { this.props.message }
        <form onSubmit={this.onSubmitHandler}>
          <TextInput id="name" value={this.state.name} onChange={this.onChangeHandler} />
          <ParticipantButton hasEventWaitlist={this.props.hasEventWaitlist} />
        </form>
      </div>
    )
  }
}
