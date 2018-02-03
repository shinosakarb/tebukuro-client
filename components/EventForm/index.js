// @flow
import React, { Component } from 'react'
import TextInput from '../forms/TextInput'

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
          <TextInput id="name" value={this.state.name} onChange={this.onChangeHandler} />
          <TextInput id="description" value={this.state.description} onChange={this.onChangeHandler} />
          <TextInput id="quota" value={this.state.quota} onChange={this.onChangeHandler} />
          <input type="submit" />
        </form>
      </div>
    )
  }
}
