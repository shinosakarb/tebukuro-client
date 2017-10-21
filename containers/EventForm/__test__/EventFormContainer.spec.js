import React from 'react'
import { shallow } from 'enzyme'
import ToJson from 'enzyme-to-json'
import { EventForm } from '../index'

describe('Event container', () => {
  it('should render self and subcomponents', () => {
    const wrapper = shallow(<EventForm />)
    const tree = ToJson(wrapper)

    expect(tree).toMatchSnapshot()
  })
})
