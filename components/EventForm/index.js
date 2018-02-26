// @flow
import React, { Component } from 'react'
import TextInputField from '../forms/TextInputField'

type Props = {
  onSubmit: Function,
  onValidation: Function,
  validationErrors: Object,
  validationFailed: boolean,
}
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

  onBlurHandler = (e: SyntheticInputEvent<>) => {
    const { id, value } = e.target
    this.props.onValidation(id, value)
  }

  onChangeHandler = (e: SyntheticInputEvent<>) => {
    const { id, value } = e.target
    this.setState({
      ...this.state,
      [id]: value,
    })
    this.props.onValidation(id, value)
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
          <TextInputField
            id="name"
            value={this.state.name}
            onChange={this.onChangeHandler}
            onBlur={this.onBlurHandler}
            errorMessages={this.props.validationErrors.name}
          />
          <TextInputField
            id="description"
            value={this.state.description}
            onChange={this.onChangeHandler}
            onBlur={this.onBlurHandler}
            errorMessages={this.props.validationErrors.description}
          />
          <TextInputField
            id="quota"
            value={this.state.quota}
            onChange={this.onChangeHandler}
            onBlur={this.onBlurHandler}
            errorMessages={this.props.validationErrors.quota}
          />
          <input type="submit" disabled={this.props.validationFailed} />
        </form>
      </div>
    )
  }
}
