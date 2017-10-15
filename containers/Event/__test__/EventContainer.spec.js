import React              from 'react'
import { mount, shallow } from 'enzyme'
import ToJson             from 'enzyme-to-json'
import { Event }          from '../index.js'

describe('Event container', () => {
  it('should render self and subcomponents', () => {
    const wrapper = shallow(<Event/>)
    const tree = ToJson(wrapper)
    expect(tree).toMatchSnapshot()
  })
})
