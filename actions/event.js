// @flow
import { createAction } from 'redux-actions'
import Router from 'next/router'
import type { Dispatch } from 'redux'
import ActionsType from '../constants/Actions'
// TODO: Enable ESLint and flow check after API implemented.
/* eslint-disable */
// flow-disable-nextline
import EventAPI from '../api/Event'
import type { EventProps } from '../types/Event'


const create = createAction(ActionsType.Event.createEvent, EventAPI.create)

// TODO: Return reject in thunk.
export const createEvent = (params: EventProps) => (dispatch: Dispatch, getState: Function) => {
    return dispatch(create(params)).then(res => {
       const id = getState().event.id
       !res.error && Router.replace(`/event/show?id=${id}`, `/event/${id}`)
    })
}

export const fetchEvent = createAction(ActionsType.Event.fetchEvent, EventAPI.find)
