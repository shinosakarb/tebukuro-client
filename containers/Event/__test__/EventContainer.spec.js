import React              from 'react'
import { mount, shallow } from 'enzyme'
import ToJson             from 'enzyme-to-json'
import { Event }          from '../index.js'

// Mocking the Event component.
jest.mock('../../../components/Event', () => 'EventComponent',
  { virtual: true }
) 

// Mocking the Event action.
jest.mock('../../../actions/Event', () => 'EventAction',
  { virtual: true }
)

const props = {
  event: {
    id: 1,
    name: 'event1',
    description: 'This is the first event.'
  },
  eventId: 1,
  showEvent: jest.fn()
}

describe('Event container', () => {
  it('should call showEvent in componentDidMount once', () => {
    const wrapper = mount(<Event {...props} />)
    expect(props.showEvent).toHaveBeenCalledTimes(1)
    expect(props.showEvent).toBeCalledWith(props.event.id)
  })

  it('should render self and subcomponents', () => {
    const wrapper = shallow(<Event {...props} />)
    const tree = ToJson(wrapper)
    expect(tree).toMatchSnapshot()
  })
})
