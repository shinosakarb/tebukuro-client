// @flow
import React, { Component } from 'react'
import TextInputField from '../forms/TextInputField'

type Props = { onSubmit: Function }
type State = {
  name: string,
  description: string,
  quota: number
}

export default class EventForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { name: '', description: '', quota: 0 }
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
        <h3>Event registration form</h3>
        <form onSubmit={this.onSubmitHandler}>
          <TextInputField id="name" value={this.state.name} onChange={this.onChangeHandler} />
          <TextInputField id="description" value={this.state.description} onChange={this.onChangeHandler} />
          <TextInputField id="quota" value={this.state.quota} onChange={this.onChangeHandler} />
          <input type="submit" />
        </form>
      </div>
    )
  }
}
