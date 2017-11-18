// @flow
import { createAction } from 'redux-actions'
import Router from 'next/router'
import type { Dispatch } from 'redux'
import { normalize } from 'normalizr'
import ActionsType from '../constants/Actions'
import { event, participant } from '../api'
import type { EventProps } from '../types/Event'
import EventSchema from '../schemas/event'
import ParticipantSchema from '../schemas/participant'

const create = createAction(ActionsType.Event.createEvent)
const fetch = createAction(ActionsType.Event.fetchEvent)
const join = createAction(ActionsType.Event.registerForEvent)

// TODO: Return reject in thunk.
export const createEvent = (params: EventProps) => (dispatch: Dispatch, getState: Function) => (
  event.create(params)
    .then((res) => {
      const normalizedValue = normalize(res, EventSchema)
      return dispatch(create(normalizedValue))
    })
    .then(() => {
      const { id } = getState().event
      Router.replace(`/event/show?id=${id}`, `/event/${id}`)
    })
    .catch(error => dispatch(create(error)))
)

export const fetchEvent = (id: number) => (dispatch: Dispatch) =>
  event.find(id)
    .then((res) => {
      const normalizedValue = normalize(res, EventSchema)
      return dispatch(fetch(normalizedValue))
    })
    .catch(error => dispatch(fetch(error)))

export const registerForEvent = (params: Object) => (dispatch: Dispatch) =>
  participant.create(params)
    .then((res) => {
      const normalizedValue = normalize(res, ParticipantSchema)
      return dispatch(join(normalizedValue))
    })
    .catch(error => dispatch(join(error)))
