import { shallow }   from 'enzyme'
import shallowToJson from 'enzyme-to-json'
import Event         from '../index.js'

const event = {
  id:            1,
  name:          'event1',
  description:   'This is the first event.',
}

describe('Event Component', () => {
  it('renders self.', () => {
    const component = shallow(
      <Event event={ event } />
    )
    const tree = shallowToJson(component)

    expect(tree).toMatchSnapshot()
  })
})
