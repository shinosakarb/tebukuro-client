// @flow
import { createAction } from 'redux-actions'
import Router from 'next/router'
import type { Dispatch } from 'redux'
import ActionsType from '../constants/Actions'
import { event } from '../api'
import type { EventProps } from '../types/Event'

const create = createAction(ActionsType.Event.createEvent, event.create)

// TODO: Return reject in thunk.
export const createEvent = (params: EventProps) => (dispatch: Dispatch, getState: Function) => (
  dispatch(create(params)).then((res) => {
    const { id } = getState().event
    !res.error && Router.replace(`/event/show?id=${id}`, `/event/${id}`)
  })
)

export const fetchEvent = createAction(ActionsType.Event.fetchEvent, event.find)
