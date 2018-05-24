export default {
  event1: {
    id: 1,
    name: 'event1',
    description: 'This is the first event.',
    quota: 10,
    eventStartsAt: '2018-03-01T09:00:00',
    eventEndsAt: '2018-03-01T17:00:00',
    registered: true,
    participants: [],
  },
  errorEvent: {
    id: 1,
    name: 'event1',
    description: 'This is the first event.',
    quota: 10,
    eventStartsAt: '2018-03-01T09:00:00',
    eventEndsAt: '2018-03-01T17:00:00',
    registered: false,
    participants: [],
    errors: ['nameを入力してください', 'nameは１０文字以内です'],
  },
}
