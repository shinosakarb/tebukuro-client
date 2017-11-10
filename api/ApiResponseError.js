// @flow
export default class ApiResponseError extends Error {
  messages: ?string[]
  name: string

  constructor(messages: ?string[]) {
    super(messages)
    this.messages = messages
    this.name = 'ApiResponseError'
  }
}
