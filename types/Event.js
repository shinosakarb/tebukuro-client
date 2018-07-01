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
  withinDeadline: boolean,
  participants: Object[],
  errors: ?string[]
}

export type UserParticipation = {
  registered: boolean,
  onWaitingList: boolean,
}
