import React from 'react'
import { shallow } from 'enzyme'
import shallowToJson from 'enzyme-to-json'
import ParticipantButton from '../index'

describe('ParticipantButton', () => {
  describe('with event has a waitlist', () => {
    it('renders participant button with waitlited message.', () => {
      const wrapper = shallow(<ParticipantButton hasEventWaitlist />)
      const tree = shallowToJson(wrapper)

      expect(tree).toMatchSnapshot()
    })
  })

  describe('with event has no waitlist', () => {
    it('renders participant button with admit message.', () => {
      const wrapper = shallow(<ParticipantButton hasEventWaitlist={false} />)
      const tree = shallowToJson(wrapper)

      expect(tree).toMatchSnapshot()
    })
  })
})
