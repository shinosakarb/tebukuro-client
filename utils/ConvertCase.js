// @flow
import _ from 'lodash'

const convertKeysInDeep = (obj, converter) => {
  if (!_.isObject(obj)) { return obj }

  if (_.isArray(obj)) { return obj.map(v => convertKeysInDeep(v, converter)) }

  return _.chain(obj)
    .mapKeys((v, k) => converter(k))
    .mapValues(v => convertKeysInDeep(v, converter))
    .value()
}

const ConvertCase = {
  camelKeysOf(obj: Object) {
    return convertKeysInDeep(obj, _.camelCase)
  },

  snakeKeysOf(obj: Object) {
    return convertKeysInDeep(obj, _.snakeCase)
  },
}

export default ConvertCase
