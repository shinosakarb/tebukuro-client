// @flow
import { createAction } from 'redux-actions'
import Router from 'next/router'
import type { Dispatch } from 'redux'
import ActionsType from '../constants/Actions'
import { event, participant } from '../api'
import EventSchema from '../schemas/event'
import ParticipantSchema from '../schemas/participant'
import { getEventId } from '../selectors/event'
import type { EventProps } from '../types/Event'

const metaCreator = schema => () => (
  { normalizr: { schema } }
)

const create =
  createAction(ActionsType.Event.createEvent, event.create, metaCreator(EventSchema))

// TODO: Return reject in thunk.
export const createEvent = (params: EventProps) => (dispatch: Dispatch, getState: Function) => (
  dispatch(create(params)).then((res) => {
    const id = getEventId(getState())
    !res.error && Router.replace(`/event/show?id=${id}`, `/event/${id}`)
  })
)

export const fetchEvent =
  createAction(
    ActionsType.Event.fetchEvent,
    event.find,
    metaCreator(EventSchema),
  )

export const registerForEvent =
  createAction(
    ActionsType.Event.registerForEvent,
    participant.create,
    metaCreator(ParticipantSchema),
  )

export const cancelRegistration = createAction(
  ActionsType.Event.cancelRegistration,
  participant.delete,
)
