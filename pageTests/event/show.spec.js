import { shallow } from 'enzyme'
import shallowToJson from 'enzyme-to-json'
import { Event } from '../../pages/event/show'

jest.mock('../../containers/Event', () => 'Event Container')

const URIQuery = { query: { id: 1 } }


describe('Event page', () => {
  it('renders the event page.', () => {
    const component = shallow(<Event url={URIQuery} />)
    const tree = shallowToJson(component)

    expect(tree).toMatchSnapshot()
  })
})
