import React from 'react'
import { mount, shallow } from 'enzyme'
import shallowToJson from 'enzyme-to-json'
import Participant from '../index'

const testProps = {
  id: 1,
  eventId: 2,
  name: 'Participant 1',
}

describe('Participant', () => {
  it('renders participant component', () => {
    const wrapper = shallow(<Participant {...testProps} onCancel={jest.fn()} />)
    const tree = shallowToJson(wrapper)

    expect(tree).toMatchSnapshot()
  })

  describe('when clicked', () => {
    const onCancel = jest.fn()
    const wrapper = mount(<Participant {...testProps} onCancel={onCancel} />)

    wrapper.find('button').simulate('click')

    it('should call onCancel once.', () => {
      expect(onCancel).toHaveBeenCalledTimes(1)
    })

    it('should call onCancel with correct argument.', () => {
      expect(onCancel).toBeCalledWith({
        id: testProps.id,
        eventId: testProps.eventId,
      })
    })
  })
})
