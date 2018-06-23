import ConvertCase from '../ConvertCase'

describe('ConvertCase', () => {
  const camelKeysParams = {
    eventId: 1,
    name: 'name',
    userParticipation: {
      registered: true,
      onWaitingList: true,
    },
  }

  const snakeKeysParams = {
    event_id: 1,
    name: 'name',
    user_participation: {
      registered: true,
      on_waiting_list: true,
    },
  }

  describe('.camelKeysOf()', () => {
    it('converts snake case to camel case', () => {
      expect(ConvertCase.camelKeysOf(snakeKeysParams)).toEqual(camelKeysParams)
    })
  })

  describe('.snakeKeysOf()', () => {
    it('converts camel case to snake case', () => {
      expect(ConvertCase.snakeKeysOf(camelKeysParams)).toEqual(snakeKeysParams)
    })
  })
})
