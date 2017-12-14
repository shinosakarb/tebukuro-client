// @flow
import type { Action } from 'redux'
import type { ThunkAction } from 'redux-thunk'

export type ReduxAction = Action | ThunkAction
export type ActionPayload = Object | Promise<*, Error>
