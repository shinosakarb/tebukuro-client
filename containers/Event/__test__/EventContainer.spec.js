import React from 'react'
import { shallow } from 'enzyme'
import ToJson from 'enzyme-to-json'
import { Event } from '../index'
import Params from '../../../factories/Event'

jest.mock('../../../components/Event', () => 'EventComponent')

describe('Event container', () => {
  it('should render self and subcomponents', () => {
    const wrapper = shallow(<Event event={Params.event1} />)
    const tree = ToJson(wrapper)
    expect(tree).toMatchSnapshot()
  })
})
