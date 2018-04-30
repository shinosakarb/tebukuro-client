import React from 'react'
import { shallow } from 'enzyme'
import shallowToJson from 'enzyme-to-json'
import ParticipantForm from '../index'

const testProps = {
  eventId: 1,
  hasEventWaitlist: true,
  isSignedIn: true,
  isUserRegistered: false,
  message: null,
  onSubmit: () => {},
  onCancel: () => {},
}

const completeProps = {
  ...testProps,
  message: '参加登録が完了しました。',
}

describe('ParticipantForm', () => {
  describe('renders participant form component', () => {
    describe('when user has already registered for the event', () => {
      it('renders CancelRegistrationButton component.', () => {
        const wrapper =
          shallow(<ParticipantForm {...testProps} isUserRegistered />)
        const tree = shallowToJson(wrapper)

        expect(tree).toMatchSnapshot()
      })
    })

    describe('when user has NOT registered for the event yet', () => {
      it('renders ParticipantButton component.', () => {
        const wrapper =
          shallow(<ParticipantForm {...testProps} />)
        const tree = shallowToJson(wrapper)

        expect(tree).toMatchSnapshot()
      })
    })

    describe('when user NOT signed in', () => {
      it('renders nothig.', () => {
        const wrapper =
          shallow(<ParticipantForm {...testProps} isSignedIn={false} />)
        const tree = shallowToJson(wrapper)

        expect(tree).toMatchSnapshot()
      })
    })
  })

  describe('on completing registeration for event', () => {
    it('renders completion message', () => {
      const wrapper = shallow(<ParticipantForm {...completeProps} />)
      const tree = shallowToJson(wrapper)

      expect(tree).toMatchSnapshot()
    })
  })
})
