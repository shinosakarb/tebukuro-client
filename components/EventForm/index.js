// @flow
import React, { Component } from 'react'

type Props = { onSubmit: Function }
type State = {
  name: string,
  description: string
}

export default class EventForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
    this.state = { name: '', description: '' }
  }

  onChangeHandler(e: SyntheticInputEvent<>) {
    e.preventDefault()
    this.setState({
      ...this.state,
      [e.target.id]: e.target.value,
    })
  }

  onSubmitHandler(e: SyntheticEvent<>) {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }

  onSubmitHandler: Function
  onChangeHandler: Function
  name: ?HTMLInputElement
  description: ?HTMLTextAreaElement

  render() {
    return (
      <div>
        <h3>Event registration form</h3>
        <form onSubmit={this.onSubmitHandler}>
          <div>
            <label htmlFor="name">
              name
              <input type="text" id="name" value={this.state.name} onChange={this.onChangeHandler} />
            </label>
          </div>
          <div>
            <label htmlFor="description">
              description
              <textarea id="description" value={this.state.description} onChange={this.onChangeHandler} />
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
