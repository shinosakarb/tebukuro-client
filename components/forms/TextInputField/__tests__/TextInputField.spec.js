import React from 'react'
import { shallow } from 'enzyme'
import shallowToJson from 'enzyme-to-json'
import TextInputField from '../index'

const testProps = {
  id: 'name',
  value: 'event1',
  onChange: jest.fn(),
}

describe('TextInput', () => {
  it('render event form component', () => {
    const wrapper = shallow(<TextInputField {...testProps} />)
    const tree = shallowToJson(wrapper)

    expect(tree).toMatchSnapshot()
  })
})
