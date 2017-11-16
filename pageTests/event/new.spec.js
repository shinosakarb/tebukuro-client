import { shallow } from 'enzyme'
import shallowToJson from 'enzyme-to-json'
import { NewEvent } from '../../pages/event/new'
import Params from '../../factories/Event'

jest.mock('../../components/EventForm', () => 'EventFormComponent')
jest.mock('../../actions/event', () => ({
  createEvent: () => {},
}))

describe('NewEvent', () => {
  describe('on first page load', () => {
    it('renders the new event page without error messages.', () => {
      const testProps = {
        createEvent: jest.fn(),
        errors: null,
      }

      const page = shallow(<NewEvent {...testProps} />)
      const tree = shallowToJson(page)

      expect(tree).toMatchSnapshot()
    })
  })
  describe('on submit invalid inputs', () => {
    it('renders the new event page without error messages.', () => {
      const testProps = {
        createEvent: jest.fn(),
        errors: Params.errorEvent.errors,
      }

      const page = shallow(<NewEvent {...testProps} />)
      const tree = shallowToJson(page)

      expect(tree).toMatchSnapshot()
    })
  })
})
