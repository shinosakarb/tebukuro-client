// @flow
import BaseValidator from './BaseValidator'
import type{ EventState } from '../components/EventForm'

const rules = {
  name: 'required',
  quota: 'required|numeric|min:1|max:1000',
  eventStartsAt: 'required',
  eventEndsAt: 'required|after_or_equal:eventStartsAt',
}

// This custom message is needed until next release of validatorjs package.
const dateErrorMessage =
  { after_or_equal: 'イベント終了日はイベント開始日より後の日付を入力してください。' }

export default (id: string, state: EventState) => {
  if (rules[id]) {
    const validator = new BaseValidator({ ...state }, { [id]: rules[id] }, dateErrorMessage)
    return { id, validationPassed: validator.passes(), errors: validator.errors.get(id) }
  }

  return { id, validationPassed: true, errors: [] }
}
