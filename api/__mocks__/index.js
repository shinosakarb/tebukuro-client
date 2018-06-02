const api = jest.genMockFromModule('../index')

let mockResult = Object.create(null)
// eslint-disable-next-line no-underscore-dangle
export const __setMockResult = (normal = true) => {
  mockResult = normal
}

const mockedPromise = params => (
  mockResult ? Promise.resolve(params) : Promise.reject(new Error())
)

export const event = {
  createEvent: mockedPromise,
  find: mockedPromise,
  registerForEvent: mockedPromise,
  cancelRegistration: mockedPromise,
}

export const participant = {
  create: mockedPromise,
  delete: mockedPromise,
}

// eslint-disable-next-line no-underscore-dangle
api.__setMockResult = __setMockResult
api.event = event
api.participant = participant

export default api
