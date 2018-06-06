// @flow
import React, { Component } from 'react'
import TextInputField from '../forms/TextInputField'
import DatePickerField from '../forms/DatePickerField'

type Props = {
  onSubmit: Function,
  onValidation: Function,
  validationErrors: Object,
  validationFailed: boolean,
}

export type EventState = {
  name: string,
  description: string,
  quota: number,
  eventStartsAt: string,
  eventEndsAt: string,
}

export default class EventForm extends Component<Props, EventState> {
  constructor(props: Props) {
    super(props)
    this.state = {
      name: '', description: '', quota: 0, eventStartsAt: '', eventEndsAt: '',
    }
  }

  onBlurHandler = (e: SyntheticInputEvent<>) => {
    this.props.onValidation(e.target.id, this.state)
  }

  onChangeHandler = (e: SyntheticInputEvent<>) => {
    const { id, value } = e.target
    this.setState({
      ...this.state,
      [id]: value,
    })
    this.props.onValidation(id, this.state)
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
          <DatePickerField
            id="eventStartsAt"
            value={this.state.eventStartsAt}
            onChange={this.onChangeHandler}
            onBlur={this.onBlurHandler}
            errorMessages={this.props.validationErrors.eventStartsAt}
          />
          <DatePickerField
            id="eventEndsAt"
            value={this.state.eventEndsAt}
            onChange={this.onChangeHandler}
            onBlur={this.onBlurHandler}
            errorMessages={this.props.validationErrors.eventEndsAt}
          />
          <input type="submit" disabled={this.props.validationFailed} />
        </form>
      </div>
    )
  }
}
