import React from 'react'
import { mount, shallow } from 'enzyme'
import shallowToJson from 'enzyme-to-json'
import EventForm from '../index'
import Params from '../../../factories/Event'

const inputValues = {
  name: Params.event1.name,
  description: Params.event1.description,
}

describe('EventForm', () => {
  it('render event form component', () => {
    const wrapper = shallow(<EventForm onSubmit={jest.fn()} />)
    const tree = shallowToJson(wrapper)

    expect(tree).toMatchSnapshot()
  })

  describe('when submit', () => {
    describe('with correct argument', () => {
      const onSubmit = jest.fn()
      const wrapper = mount(<EventForm onSubmit={onSubmit} />)

      const nameElement = wrapper.find('[type="text"]')
      const descriptionElement = wrapper.find('textarea')

      nameElement.instance().value = inputValues.name
      descriptionElement.instance().value = inputValues.description
      wrapper.find('[type="submit"]').simulate('submit')

      it('should call onSubmit once.', () => {
        expect(onSubmit).toHaveBeenCalledTimes(1)
      })

      it('should call onSubmit with correct argument.', () => {
        expect(onSubmit).toBeCalledWith(inputValues)
      })
    })
  })
})
