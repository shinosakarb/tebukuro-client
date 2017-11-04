import React from 'react'
import { shallow, mount } from 'enzyme'
import ToJson from 'enzyme-to-json'
import { Event } from '../index'
import Params from '../../../factories/Event'

jest.mock('../../../components/Event', () => 'EventComponent')
// TODO: Remove virtual mode after API implemented.
jest.mock('../../../api/Event', () => ({
  find: jest.fn(),
}), { virtual: true })

let fetchEvent = Object.create(null)

describe('Event container', () => {
  beforeEach(() => {
    fetchEvent = jest.fn()
  })

  it('should render self and subcomponents', () => {
    const wrapper = shallow(<Event
      eventId={Params.event1.id}
      event={Params.event1}
      fetchEvent={fetchEvent}
    />)
    const tree = ToJson(wrapper)
    expect(tree).toMatchSnapshot()
  })

  it('should call fetchEvent once with correct eventId', () => {
    mount(<Event
      eventId={Params.event1.id}
      event={Params.event1}
      fetchEvent={fetchEvent}
    />)

    expect(fetchEvent).toHaveBeenCalledTimes(1)
    expect(fetchEvent).toBeCalledWith(Params.event1.id)
  })
})
