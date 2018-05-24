/* eslint-disable import/no-extraneous-dependencies */
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
/* eslint-disable import/no-extraneous-dependencies */
import moment from 'moment-timezone'

configure({ adapter: new Adapter() })

// Default timezone for frontend tests is UTC.
moment.tz.setDefault('UTC')
