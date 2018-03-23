import React from 'react'
import { shallow, mount } from 'enzyme'
import shallowToJson from 'enzyme-to-json'
import CancelRegistrationButton from '../index'

const testProps = {
  eventId: 1,
}

describe('CancelRegistrationButton', () => {
  describe('with event has a waitlist', () => {
    it('renders CancelRegistrationButton.', () => {
      const wrapper = shallow(<CancelRegistrationButton />)
      const tree = shallowToJson(wrapper)

      expect(tree).toMatchSnapshot()
    })
  })

  describe('when clicked', () => {
    const onCancel = jest.fn()
    const wrapper =
      mount(<CancelRegistrationButton {...testProps} onClick={onCancel} />)

    wrapper.find('button').simulate('click')

    it('should call onCancel once.', () => {
      expect(onCancel).toHaveBeenCalledTimes(1)
    })

    it('should call onCancel with correct argument.', () => {
      expect(onCancel).toBeCalledWith({
        eventId: testProps.eventId,
      })
    })
  })
})
