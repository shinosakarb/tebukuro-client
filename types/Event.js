// @flow

export type EventId = {
  id: number
}

export type EventProps = {
  id: ?number,
  name: string,
  description: string,
  quota: number,
  eventStartsAt: string,
  eventEndsAt: string,
  registered: boolean,
  participants: Object[],
  errors: ?string[]
}
