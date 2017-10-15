import React, { Component } from 'react'

export default class EventForm extends Component {
  constructor(props){
    super(props)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
  }

  onSubmitHandler(e) {
    e.preventDefault()
    const params = {
      name: this.name.value,
      description: this.description.value
    }
    this.props.onSubmit(params)
  }

  render(){
    return (
      <div>
        <h3>Event registration form</h3>
        <form onSubmit={ this.onSubmitHandler }>
          <div>
            <label>
              name
              <input type="text" ref={(input) => { this.name = input }} />
            </label>
          </div>
          <div>
            <label>
              description
              <textarea ref={(input) => { this.description = input }}/>
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
