import React from 'react'
import { mount, shallow } from 'enzyme'
import shallowToJson from 'enzyme-to-json'
import ParticipantForm from '../index'

const inputValues = {
  name: 'participant1',
}

const testProps = {
  eventId: 1,
}

const errorProps = {
  ...testProps,
  errors: ['名前を入力して下さい'],
}

describe('ParticipantForm', () => {
  it('renders participant form component', () => {
    const wrapper = shallow(<ParticipantForm {...testProps} onSubmit={jest.fn()} />)
    const tree = shallowToJson(wrapper)

    expect(tree).toMatchSnapshot()
  })

  it('renders participant form component with error message', () => {
    const wrapper = shallow(<ParticipantForm {...errorProps} onSubmit={jest.fn()} />)
    const tree = shallowToJson(wrapper)

    expect(tree).toMatchSnapshot()
  })

  describe('when submit', () => {
    describe('with correct argument', () => {
      const onSubmit = jest.fn()
      const wrapper = mount(<ParticipantForm {...testProps} onSubmit={onSubmit} />)

      const nameElement = wrapper.find('[type="text"]')

      nameElement.simulate(
        'change',
        { target: { id: 'name', value: inputValues.name } },
      )
      wrapper.find('[type="submit"]').simulate('submit')

      it('should call onSubmit once.', () => {
        expect(onSubmit).toHaveBeenCalledTimes(1)
      })

      it('should call onSubmit with correct argument.', () => {
        expect(onSubmit).toBeCalledWith({ ...inputValues, ...testProps })
      })
    })
  })
})
