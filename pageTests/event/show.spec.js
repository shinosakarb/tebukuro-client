import { shallow, mount } from 'enzyme'
import shallowToJson from 'enzyme-to-json'
import { ShowEvent } from '../../pages/event/show'
import EventParams from '../../factories/Event'
import ParticipantParams from '../../factories/Participant'

jest.mock('../../components/Event', () => 'EventComponent')
jest.mock('../../actions/event', () => ({
  fetchEvent: () => {},
}))

const testProps = {
  url: { query: { id: EventParams.event1.id } },
  event: EventParams.event1,
  participants: Object.values(ParticipantParams),
  fetchEvent: jest.fn(),
  registerForEvent: jest.fn(),
}

describe('ShowEvent', () => {
  beforeEach(() => {
    testProps.fetchEvent.mockReset()
  })

  describe('when available to participate', () => {
    it('renders the event page with participate text.', () => {
      const page = shallow(<ShowEvent {...testProps} />)
      const tree = shallowToJson(page)

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when having a waiting list', () => {
    it('renders the event page wtih waitlisted text.', () => {
      const waitlistedEvent = {
        ...EventParams.event1,
        quota: 1,
        participants: [1, 2],
      }

      const page = shallow(<ShowEvent {...testProps} event={waitlistedEvent} />)
      const tree = shallowToJson(page)

      expect(tree).toMatchSnapshot()
    })
  })

  it('renders the page with error messages.', () => {
    const errorTestProps = { ...testProps, event: EventParams.errorEvent }
    const page = shallow(<ShowEvent {...errorTestProps} />)
    const tree = shallowToJson(page)

    expect(tree).toMatchSnapshot()
  })

  it('renders the page not found error page.', () => {
    const errorTestProps = { ...testProps, event: { errors: ['Not Found'] } }
    const page = shallow(<ShowEvent {...errorTestProps} />)
    const tree = shallowToJson(page)

    expect(tree).toMatchSnapshot()
  })

  it('should call fetchEvent once with correct params', () => {
    mount(<ShowEvent {...testProps} />)

    expect(testProps.fetchEvent).toHaveBeenCalledTimes(1)
    expect(testProps.fetchEvent).toBeCalledWith({ id: EventParams.event1.id })
  })
})
