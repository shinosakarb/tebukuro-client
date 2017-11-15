import { shallow } from 'enzyme'
import shallowToJson from 'enzyme-to-json'
import { EventForm } from '../../pages/event/new'

jest.mock('../../containers/EventForm', () => 'Event Container')

describe('Event page', () => {
  it('renders the event page.', () => {
    const component = shallow(<EventForm />)
    const tree = shallowToJson(component)

    expect(tree).toMatchSnapshot()
  })
})
