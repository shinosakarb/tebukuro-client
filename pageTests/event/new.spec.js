import { shallow } from 'enzyme'
import shallowToJson from 'enzyme-to-json'
import EventFormPage from '../../pages/event/new'

jest.mock('../../containers/EventForm', () => 'Event Container')

describe('Event page', () => {
  it('renders the event page.', () => {
    const component = shallow(<EventFormPage />)
    const tree = shallowToJson(component)

    expect(tree).toMatchSnapshot()
  })
})
