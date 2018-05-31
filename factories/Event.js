export default {
  event1: {
    id: 1,
    name: 'event1',
    description: 'This is the first event.',
    quota: 10,
    eventStartsAt: '2018-03-01T09:00:00',
    eventEndsAt: '2018-03-01T17:00:00',
    withinDeadline: true,
    userParticipation: {
      registered: true,
      onWaitingList: false,
    },
    participants: [],
  },
  errorEvent: {
    id: 1,
    name: 'event1',
    description: 'This is the first event.',
    quota: 10,
    errors: ['nameを入力してください', 'nameは１０文字以内です'],
    eventStartsAt: '2018-03-01T09:00:00',
    eventEndsAt: '2018-03-01T17:00:00',
    withinDeadline: true,
    userParticipation: {
      registered: false,
      onWaitingList: false,
    },
    participants: [],
  },
}
