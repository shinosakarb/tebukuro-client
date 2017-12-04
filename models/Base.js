// @flow
import { Record } from 'immutable'

export default (args: Object = {}) => {
  const base = Record({ errors: [], ...args })

  return class BaseClass extends base {
    isError() {
      return this.errors.length !== 0
    }
  }
}
