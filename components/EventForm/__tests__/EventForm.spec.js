import React from 'react'
import { mount, shallow } from 'enzyme'
import shallowToJson from 'enzyme-to-json'
import EventForm from '../index'
import EventParams from '../../../factories/Event'

const inputValues = {
  name: EventParams.event1.name,
  description: EventParams.event1.description,
  quota: EventParams.event1.quota,
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

      const nameElement = wrapper.find('#name')
      const descriptionElement = wrapper.find('#description')
      const quotaElement = wrapper.find('#quota')

      nameElement.simulate(
        'change',
        { target: { id: 'name', value: inputValues.name } },
      )
      descriptionElement.simulate(
        'change',
        { target: { id: 'description', value: inputValues.description } },
      )
      quotaElement.simulate(
        'change',
        { target: { id: 'quota', value: inputValues.quota } },
      )
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
