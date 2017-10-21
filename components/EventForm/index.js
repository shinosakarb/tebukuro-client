// @flow
import React, { Component } from 'react'

type Props = { onSubmit: Function }

export default class EventForm extends Component<Props> {
  constructor(props: Props) {
    super(props)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
  }

  onSubmitHandler(e: SyntheticEvent<>) {
    e.preventDefault()
    if (this.name && this.description) {
      const params = {
        name: this.name.value,
        description: this.description.value,
      }
      this.props.onSubmit(params)
    }
  }

  onSubmitHandler: Function
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
              <input type="text" id="name" ref={(input) => { this.name = input }} />
            </label>
          </div>
          <div>
            <label htmlFor="description">
              description
              <textarea id="description" ref={(input) => { this.description = input }} />
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
