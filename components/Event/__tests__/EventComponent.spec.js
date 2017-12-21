import { shallow } from 'enzyme'
import shallowToJson from 'enzyme-to-json'
import Event from '../index'
import EventParams from '../../../factories/Event'

const testParams = {
  ...EventParams.event1,
  participants: [1, 2, 3],
}

describe('Event Component', () => {
  it('renders self.', () => {
    const component = shallow(<Event event={testParams} />)
    const tree = shallowToJson(component)

    expect(tree).toMatchSnapshot()
  })
})
