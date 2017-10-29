import React from 'react'
import { shallow } from 'enzyme'
import ToJson from 'enzyme-to-json'
import { EventForm } from '../index'

jest.mock('../../../actions/event')
// TODO: Remove virtual mode after API implemented.
jest.mock('../../../api/Event', () => ({
  create: jest.fn(),
}), { virtual: true })

const props = {
  createEvent: jest.fn(),
}

describe('Event container', () => {
  it('should render self and subcomponents', () => {
    const wrapper = shallow(<EventForm {...props} />)
    const tree = ToJson(wrapper)

    expect(tree).toMatchSnapshot()
  })
})
