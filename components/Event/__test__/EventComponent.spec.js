import { shallow } from 'enzyme'
import shallowToJson from 'enzyme-to-json'
import Event from '../index'
import Params from '../../../factories/Event'

describe('Event Component', () => {
  it('renders self.', () => {
    const component = shallow(<Event event={Params.event1} />)
    const tree = shallowToJson(component)

    expect(tree).toMatchSnapshot()
  })
})
