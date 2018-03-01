// @flow
import axios from 'axios'
import { setToken, getAuthInfo } from '../utils/auth'

const client = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 2000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

client.interceptors.request.use((config) => {
  const { accessToken, clientId, uid } = getAuthInfo()

  if (accessToken) {
    /* eslint-disable no-alert, no-param-reassign */
    config.headers['access-token'] = accessToken
    config.headers.client = clientId
    config.headers.uid = uid
    /* eslint-enable no-alert, no-console */
  }
  return config
}, error => Promise.reject(error))

client.interceptors.response.use((response) => {
  const token = response.headers && response.headers['access-token']

  if (token) {
    setToken(token)
  }
  return response
}, error => Promise.reject(error))

export default client
