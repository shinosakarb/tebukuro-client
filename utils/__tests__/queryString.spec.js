import getQueryStringOfWindow from '../queryString'

describe('getQueryStringOfWindow', () => {
  const windowObject = {
    location: {
      search: '?id=1&auth_token=authtoken',
    },
  }

  it('converts search query to Object', () => {
    const expected = {
      id: '1',
      auth_token: 'authtoken',
    }

    expect(getQueryStringOfWindow(windowObject)).toEqual(expected)
  })
})
