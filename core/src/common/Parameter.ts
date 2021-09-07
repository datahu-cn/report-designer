import {Util} from './Util'

export class Parameter {
  static get query(): any {
    return Util.Url.query(location.href)
  }
}
