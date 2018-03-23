import React from 'react'
import { shallow } from 'enzyme'
import shallowToJson from 'enzyme-to-json'
import Participant from '../index'

const testProps = {
  id: 1,
  eventId: 2,
  name: 'Participant 1',
  onWaitingList: false,
}

describe('Participant', () => {
  describe('with admitted participant', () => {
    it('renders participant component with admitted message.', () => {
      const wrapper = shallow(<Participant {...testProps} />)
      const tree = shallowToJson(wrapper)

      expect(tree).toMatchSnapshot()
    })
  })

  describe('with waitlisted participant', () => {
    it('renders participant component with waitlisted message.', () => {
      const waitlistedProps = { ...testProps, onWaitingList: true }
      const wrapper = shallow(<Participant {...waitlistedProps} />)
      const tree = shallowToJson(wrapper)

      expect(tree).toMatchSnapshot()
    })
  })
})
