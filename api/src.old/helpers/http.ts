import { validate } from "class-validator"
import { fromPairs } from "lodash"

const HTTP_ERROR_VALIDATION = "Validation error"

type ValidationResult<T> =
  | { success: true; value: T }
  | { success: false; errors: { [property: string]: string[] } }

export async function validateRequestBody<T>(
  instance: T,
  body: object,
): Promise<ValidationResult<T>> {
  const mergedInstance = Object.assign(instance, body as {})
  const errors = await validate(mergedInstance)

  if (errors.length > 0) {
    return {
      success: false,
      errors: fromPairs(errors.map(error => [error.property, Object.values(error.constraints)])),
    }
  }

  return {
    success: true,
    value: mergedInstance,
  }
}
