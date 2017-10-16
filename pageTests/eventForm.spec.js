import { shallow } from 'enzyme'
import shallowToJson from 'enzyme-to-json'
import EventFormPage from '../pages/eventForm'

describe('Event page', () => {
  it('renders the event page.', () => {
    const component = shallow(<EventFormPage />)
    const tree = shallowToJson(component)

    expect(tree).toMatchSnapshot()
  })
})
