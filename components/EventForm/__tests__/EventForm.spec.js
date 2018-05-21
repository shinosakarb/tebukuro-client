import React from 'react'
import { mount, shallow } from 'enzyme'
import shallowToJson from 'enzyme-to-json'
import EventForm from '../index'
import EventParams from '../../../factories/Event'

const inputValues = {
  name: EventParams.event1.name,
  description: EventParams.event1.description,
  quota: EventParams.event1.quota,
  eventStartsAt: EventParams.event1.eventStartsAt,
}

const testProps = {
  onSubmit: jest.fn(),
  onValidation: jest.fn(),
  validationErrors: { name: ['nameは必須です。'] },
  validationFailed: false,
}

describe('EventForm', () => {
  it('render event form component', () => {
    const wrapper = shallow(<EventForm {...testProps} />)
    const tree = shallowToJson(wrapper)

    expect(tree).toMatchSnapshot()
  })

  describe('form fields', () => {
    beforeEach(() => {
      testProps.onValidation.mockReset()
    })

    const wrapper = mount(<EventForm {...testProps} />)

    const nameElement = wrapper.find('input#name')
    const descriptionElement = wrapper.find('input#description')
    const quotaElement = wrapper.find('input#quota')

    describe('when field value changed', () => {
      it('should call onValidation once.', () => {
        nameElement.simulate(
          'change',
          { target: { id: 'name', value: inputValues.name } },
        )

        expect(testProps.onValidation).toHaveBeenCalledTimes(1)
      })
    })

    describe('when field lost focus', () => {
      it('should call onValidation once.', () => {
        nameElement.simulate(
          'blur',
          { target: { id: 'name', value: inputValues.name } },
        )

        expect(testProps.onValidation).toHaveBeenCalledTimes(1)
      })
    })

    describe('when submit params', () => {
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
      quotaElement.simulate(
        'change',
        { target: { id: 'eventStartsAt', value: inputValues.eventStartsAt } },
      )
      quotaElement.simulate(
        'change',
        { target: { id: 'eventEndsAt', value: inputValues.eventEndsAt } },
      )
      wrapper.find('[type="submit"]').simulate('submit')

      it('should call onSubmit once.', () => {
        expect(testProps.onSubmit).toHaveBeenCalledTimes(1)
      })

      it('should call onSubmit with correct params.', () => {
        expect(testProps.onSubmit).toBeCalledWith(inputValues)
      })
    })
  })
})
