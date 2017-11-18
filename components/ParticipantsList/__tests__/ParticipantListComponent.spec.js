import { shallow } from 'enzyme'
import shallowToJson from 'enzyme-to-json'
import ParticipantList from '../index'
import ParticipantParams from '../../../factories/Participant'

describe('ParticipantList Component', () => {
  it('renders self.', () => {
    const participants = Object.values(ParticipantParams)
    const component = shallow(<ParticipantList participants={participants} />)
    const tree = shallowToJson(component)

    expect(tree).toMatchSnapshot()
  })
})
