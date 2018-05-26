// @flow
import pathToRegexp from 'path-to-regexp'
import moment from 'moment-timezone'
import Base from './Base'

type createProps = {
  name: string,
  description: string,
  quota: number,
  eventStartsAt: string,
  eventEndsAt: string,
}

const toISOString = (datetime: string) => moment(datetime).format()

export default class Event extends Base {
  cancelRegistration = (params: number) => {
    const url = pathToRegexp.compile(this.endpoints.cancelRegistration)(params)
    return this.client.delete(url).then(this.onSuccess, this.onFailure)
  }

  createEvent = (params: createProps) => {
    const createParams = {
      ...params,
      eventStartsAt: toISOString(params.eventStartsAt),
      eventEndsAt: toISOString(params.eventEndsAt),
    }

    return this.create(createParams)
  }
}
