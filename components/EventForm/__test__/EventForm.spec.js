import React              from 'react'
import { mount, shallow } from 'enzyme'
import shallowToJson      from 'enzyme-to-json'
import EventForm          from '../index.js'

const onSubmit = jest.fn()

const inputValues = {
  name: 'event1',
  description: 'This is the first event.'
}

describe('EventForm', () => {
  it('render event form component', () => {
    const wrapper = shallow(<EventForm onSubmit={ onSubmit } />)
    const tree = shallowToJson(wrapper)

    expect(tree).toMatchSnapshot()
  })

  describe('when submit', () => {
    it('should call onSubmit function with correct argument.', () => {
      const wrapper = mount(<EventForm onSubmit={ onSubmit } />)

      const nameInput = wrapper.find('[type="text"]')
      const descriptionInput = wrapper.find('textarea')

      nameInput.instance().value = inputValues.name
      descriptionInput.instance().value = inputValues.description

      wrapper.find('[type="submit"]').simulate('submit')

      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmit).toBeCalledWith(inputValues)
    })
  })
})
