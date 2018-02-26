// @flow
import BaseValidator from './BaseValidator'

const rules = {
  name: 'required',
  quota: 'required|numeric|min:1|max:1000',
}

export default (id: string, value: string) => {
  const rule = rules[id]
  if (rule) {
    const validator = new BaseValidator({ [id]: value }, { [id]: rule })
    return { id, validationPassed: validator.passes(), errors: validator.errors.get(id) }
  }
  return { id, validationPassed: true, errors: [] }
}
