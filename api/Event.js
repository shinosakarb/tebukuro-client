// @flow
import pathToRegexp from 'path-to-regexp'
import Base from './Base'

export default class Event extends Base {
  cancelRegistration = (params: number) => {
    const url = pathToRegexp.compile(this.endpoints.cancelRegistration)(params)
    return this.client.delete(url).then(this.onSuccess, this.onFailure)
  }
}
