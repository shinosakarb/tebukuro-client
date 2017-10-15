import pathToRegexp from 'path-to-regexp'
import client from './client'

export default class Base {
  constructor(endpoints) {
    this.endpoints = endpoints
    this.client = client
  }

  onSuccess(response) {
    return response.body
  }

  onFailure(error) {
    return error.response.body
  }

  all(params) {
    const url = this.endpoints.all
    this.client.get(url, params).then(this.onSuccess, this.onFailure)
  }

  find(params) {
    const url = pathToRegexp.compile(this.endpoints.find, params)
    this.client.get(url).then(this.onSuccess, this.onFailure)
  }

  create(params) {
    const url = pathToRegexp.compile(this.endpoints.create, params)
    this.client.post(url, params).then(this.onSuccess, this.onFailure)
  }

  update(params) {
    const url = pathToRegexp.compile(this.endpoints.update, params)
    this.client.post(url, params).then(this.onSuccess, this.onFailure)
  }

  delete(params) {
    const url = pathToRegexp.compile(this.endpoints.delete, params)
    this.client.delete(url).then(this.onSuccess, this.onFailure)
  }
}
