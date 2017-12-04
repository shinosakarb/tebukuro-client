// @flow
import _ from 'lodash'

const convertKeys = (dict, converter) => (
  _.mapKeys(dict, (v, k) => converter(k))
)

const ConvertCase = {
  camelKeysOf(dict: Object) {
    return convertKeys(dict, _.camelCase)
  },

  snakeKeysOf(dict: Object) {
    return convertKeys(dict, _.snakeCase)
  },
}

export default ConvertCase
