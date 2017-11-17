// @flow
import React, { Component } from 'react'

type Props = {
  onSubmit: Function,
  eventId: ?number,
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

  // TODO: Extract component and fields as common components
  render() {
    return (
      <div>
        <h3>Event participation form</h3>
        <form onSubmit={this.onSubmitHandler}>
          <div>
            <label htmlFor="name">
              name
              <input type="text" id="name" value={this.state.name} onChange={this.onChangeHandler} />
            </label>
          </div>
          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
    )
  }
}
