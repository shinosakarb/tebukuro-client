// @flow
import { createAction } from 'redux-actions'
import Router from 'next/router'
import type { Dispatch } from 'redux'

import ActionsType from '../../constants/Actions'
import type { EventProps } from '../../types/Event'
// TODO: Enable ESLint and flow check after API implemented.
/* eslint-disable */
// flow-disable-nextline
import EventAPI from '../../api/Event'

const create = createAction(ActionsType.Event.createEvent)

export const createEvent = (params: EventProps) => (dispatch: Dispatch) => (
  EventAPI.create(params)
    .then((json) => {
      Router.replace(`/event/${json.id}`)
      return dispatch(create(json))
    })
    .catch(error => dispatch(create(error)))
)
