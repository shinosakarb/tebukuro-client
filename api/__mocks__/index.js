const api = jest.genMockFromModule('../index')

let mockResult = Object.create(null)
/* eslint-disable no-underscore-dangle */
export const __setMockResult = (normal = true) => {
  mockResult = normal
}
/* eslint-enable */

const mockedPromise = params => (
  mockResult ? Promise.resolve(params) : Promise.reject(new Error())
)

export const event = {
  create: mockedPromise,
  find: mockedPromise,
}

export const participant = {
  create: mockedPromise,
}

/* eslint-disable no-underscore-dangle */
api.__setMockResult = __setMockResult
/* eslint-enable */
api.event = event
api.participant = participant

export default api
