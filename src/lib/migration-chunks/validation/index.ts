import Intent from '../../intent/index'
import ErrorCollection from '../../errors/error-collection'
import IntentList from '../../intent-list'
import contentTypeValidations from './content-type'
import fieldValidations from './field'
import checkForDuplicatePropsErrors from './duplicate-props'

function validateChunks (intentList: IntentList, contentTypes): void {
  const intents: Intent[] = intentList.getIntents()
  const ctErrors = contentTypeValidations(intents, contentTypes)

  if (ctErrors.length > 0) {
    throw new ErrorCollection(ctErrors, {payloadValidationError: true})
  }

  const createCTs = intents.filter((intent) => intent.isContentTypeCreate())
  const createdIds = createCTs.map((createIntent) => createIntent.getContentTypeId())
  const createdCTs = createdIds.map((id) => ({id, fields: [] }))

  const allCTs = contentTypes.concat(createdCTs)
  let fieldErrors = fieldValidations(intentList.toPackages(), allCTs)
  fieldErrors = fieldErrors.concat(checkForDuplicatePropsErrors(intentList.toPackages()))

  if (fieldErrors.length > 0) {
    throw new ErrorCollection(fieldErrors, {payloadValidationError: true})
  }
}

export {
  validateChunks as default,
  validateChunks
}
