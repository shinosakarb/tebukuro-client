import { shallow, mount } from 'enzyme'
import shallowToJson from 'enzyme-to-json'
import { ShowEvent } from '../../pages/event/show'
import Params from '../../factories/Event'

jest.mock('../../components/Event', () => 'EventComponent')
jest.mock('../../actions/event', () => ({
  fetchEvent: () => {},
}))

const testProps = {
  url: { query: { id: Params.event1.id } },
  event: Params.event1,
  fetchEvent: jest.fn(),
  joinEvent: jest.fn(),
}

describe('ShowEvent', () => {
  beforeEach(() => {
    testProps.fetchEvent.mockReset()
  })

  it('renders the event page.', () => {
    const page = shallow(<ShowEvent {...testProps} />)
    const tree = shallowToJson(page)

    expect(tree).toMatchSnapshot()
  })

  it('renders the page with error messages.', () => {
    const errorTestProps = { ...testProps, event: Params.errorEvent }
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

  it('should call fetchEvent once with correct eventId', () => {
    mount(<ShowEvent {...testProps} />)

    expect(testProps.fetchEvent).toHaveBeenCalledTimes(1)
    expect(testProps.fetchEvent).toBeCalledWith(Params.event1.id)
  })
})
