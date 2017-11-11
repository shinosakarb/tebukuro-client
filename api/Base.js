// @flow
import pathToRegexp from 'path-to-regexp'
import client from './client'

export default class Base {
  endpoints: Object
  client: Object

  constructor(endpoints: Object) {
    this.endpoints = endpoints
    this.client = client
  }

  createErrorMessages(errorBody: Object) {
    const errorMessages = []

    Object.keys(errorBody).forEach((key) => {
      errorBody[key].forEach((error) => {
        errorMessages.push(`${key}${error}`)
      })
    })

    return errorMessages
  }

  onSuccess(response: Object) {
    return response.data
  }

  onFailure: (error: Object) => Promise<Error> = (error) => {
    const errors = error.response.status === 404 ?
      ['Not Found'] : this.createErrorMessages(error.response.data)

    /* eslint-disable prefer-promise-reject-errors */
    return Promise.reject({ errors })
    /* eslint-enable */
  }

  all() {
    const url = this.endpoints.all
    return this.client.get(url).then(this.onSuccess, this.onFailure)
  }

  find(params: number) {
    const url = pathToRegexp.compile(this.endpoints.find)(params)
    return this.client.get(url).then(this.onSuccess, this.onFailure)
  }

  create(params: Object) {
    const url = pathToRegexp.compile(this.endpoints.create)(params)
    return this.client.post(url, params).then(this.onSuccess, this.onFailure)
  }

  update(params: Object) {
    const url = pathToRegexp.compile(this.endpoints.update)(params)
    return this.client.post(url, params).then(this.onSuccess, this.onFailure)
  }

  delete(params: number) {
    const url = pathToRegexp.compile(this.endpoints.delete)(params)
    return this.client.delete(url).then(this.onSuccess, this.onFailure)
  }
}
