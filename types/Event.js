// @flow

export type EventId = {
  id: number
}

export type EventProps = {
  id: ?number,
  name: string,
  description: string,
  errors: ?string[]
}
