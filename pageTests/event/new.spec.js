import { shallow } from 'enzyme'
import shallowToJson from 'enzyme-to-json'
import { NewEvent } from '../../pages/event/new'
import Params from '../../factories/Event'

jest.mock('../../components/EventForm', () => 'EventFormComponent')
jest.mock('../../actions/event', () => ({
  createEvent: () => {},
}))

const testProps = {
  createEvent: jest.fn(),
  validateEventForm: jest.fn(),
  errors: null,
  validationErrors: { name: [], quota: [] },
  validationFailed: false,
}

describe('NewEvent', () => {
  describe('on first page load', () => {
    it('renders the new event page without error messages.', () => {
      const page = shallow(<NewEvent {...testProps} />)
      const tree = shallowToJson(page)

      expect(tree).toMatchSnapshot()
    })
  })
  describe('on submit invalid inputs', () => {
    it('renders the new event page without error messages.', () => {
      const errorTestProps = {
        ...testProps,
        errors: Params.errorEvent.errors,
      }

      const page = shallow(<NewEvent {...errorTestProps} />)
      const tree = shallowToJson(page)

      expect(tree).toMatchSnapshot()
    })
  })
})
