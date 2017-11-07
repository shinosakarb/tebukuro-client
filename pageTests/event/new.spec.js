import { shallow } from 'enzyme'
import shallowToJson from 'enzyme-to-json'
import { NewEvent } from '../../pages/event/new'

jest.mock('../../components/EventForm', () => 'EventFormComponent')
jest.mock('../../actions/event', () => ({
  createEvent: () => {},
}))

const testProps = {
  createEvent: jest.fn(),
}

describe('NewEvent', () => {
  it('renders the new event page.', () => {
    const page = shallow(<NewEvent {...testProps} />)
    const tree = shallowToJson(page)

    expect(tree).toMatchSnapshot()
  })
})
