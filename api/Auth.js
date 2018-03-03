// @flow
import Base from './Base'

export default class Auth extends Base {
  valid = () => {
    const url = this.endpoints.valid
    return this.client.get(url).then(this.onSuccess, this.onFailure)
  }
}
