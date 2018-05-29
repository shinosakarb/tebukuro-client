export default {
  event1: {
    id: 1,
    name: 'event1',
    description: 'This is the first event.',
    quota: 10,
    registered: true,
    participants: [],
    eventStartsAt: '2018-03-01T09:00:00',
    eventEndsAt: '2018-03-01T17:00:00',
  },
  errorEvent: {
    id: 1,
    name: 'event1',
    description: 'This is the first event.',
    quota: 10,
    registered: false,
    participants: [],
    errors: ['nameを入力してください', 'nameは１０文字以内です'],
    eventStartsAt: '2018-03-01T09:00:00',
    eventEndsAt: '2018-03-01T17:00:00',
  },
}
