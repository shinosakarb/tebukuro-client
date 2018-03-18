import React from 'react'
import { mount, shallow } from 'enzyme'
import shallowToJson from 'enzyme-to-json'
import ParticipantForm from '../index'

const testProps = {
  eventId: 1,
  participateButtonText: '参加登録',
  message: null,
}

const completeProps = {
  eventId: 1,
  participateButtonText: '参加登録',
  message: '参加登録が完了しました。',
}

const errorProps = {
  ...testProps,
  errors: ['名前を入力して下さい'],
  message: null,
}

describe('ParticipantForm', () => {
  it('renders participant form component', () => {
    const wrapper = shallow(<ParticipantForm {...testProps} onSubmit={jest.fn()} />)
    const tree = shallowToJson(wrapper)

    expect(tree).toMatchSnapshot()
  })

  it('renders participant form component with completion message', () => {
    const wrapper = shallow(<ParticipantForm {...completeProps} onSubmit={jest.fn()} />)
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

      wrapper.find('[type="button"]').simulate('click')

      it('should call onSubmit once.', () => {
        expect(onSubmit).toHaveBeenCalledTimes(1)
      })

      it('should call onSubmit with correct argument.', () => {
        expect(onSubmit).toBeCalledWith({ eventId: testProps.eventId })
      })
    })
  })
})
