// @flow
const createErrorMessages = (error: Object) => {
  if (error.response.status === 404) {
    return ['Not Found']
  }

  const errorMessages = []
  const errorBody = error.response.data

  Object.keys(errorBody).forEach((key) => {
    errorBody[key].forEach((message) => {
      errorMessages.push(`${key}${message}`)
    })
  })

  return errorMessages
}

export default class ApiResponseError extends Error {
  errors: string[]
  name: string

  constructor(error: Object) {
    super(error.response.data)
    this.errors = createErrorMessages(error)
    this.name = 'ApiResponseError'
  }
}
