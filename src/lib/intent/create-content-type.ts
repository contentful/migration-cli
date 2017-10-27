import Intent from './base-intent'
import { ContentTypeCreateAction } from '../action/content-type-create'

export default class CreateContentTypeIntent extends Intent {
  isContentTypeCreate () {
    return true
  }

  toActions () {
    return [
      new ContentTypeCreateAction(this.getContentTypeId())
    ]
  }
}