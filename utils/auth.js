// @flow
import { getLocalStorage, setLocalStorage, removeLocalStorage } from './localStorage'
import { auth } from '../api'

export type AuthInfo = {
  accessToken: string,
  clientId: string,
  uid: string,
}

export type AuthQueryParams = {
  auth_token: string,
  client_id: string,
  uid: string,
}

export const setToken = (token: string) => setLocalStorage('access-token', token)

export const getAuthInfo = () => ({
  accessToken: getLocalStorage('access-token'),
  clientId: getLocalStorage('client'),
  uid: getLocalStorage('uid'),
})

export const getUserInfo = () => {
  const json = getLocalStorage('user')
  return json ? JSON.parse(json) : undefined
}

export const setAuthInfo = async (info: AuthInfo) => {
  setLocalStorage('access-token', info.accessToken)
  setLocalStorage('client', info.clientId)
  setLocalStorage('uid', info.uid)

  await auth.valid()
    .then(res => setLocalStorage('user', JSON.stringify(res.data)))
    .catch(() => removeLocalStorage('user'))
}

export const getAuthParams = (authQueryParams: AuthQueryParams) => ({
  accessToken: authQueryParams.auth_token,
  clientId: authQueryParams.client_id,
  uid: authQueryParams.uid,
})
