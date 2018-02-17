import { getLocalStorage, setLocalStorage } from './localStorage'

export const setToken = token => localStorage.setItem('access-token', token)
export const getAuthInfo = () => ({
  accessToken: getLocalStorage('access-token'),
  clientId: getLocalStorage('client'),
  uid: getLocalStorage('uid'),
})
export const setAuthInfo = (info = {}) => {
  setLocalStorage('access-token', info.accessToken)
  setLocalStorage('client', info.clientId)
  setLocalStorage('uid', info.uid)
}
