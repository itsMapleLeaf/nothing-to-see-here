import { HttpException, HttpStatus } from "@nestjs/common"
import { validate } from "class-validator"
import { fromPairs } from "lodash"

const HTTP_ERROR_VALIDATION = "Validation error"

export async function validateRequestBody<T>(instance: T, body: object): Promise<T> {
  const mergedInstance = Object.assign(instance, body as {})
  const errors = await validate(mergedInstance)
  if (errors.length > 0) {
    throw new HttpException(
      {
        errorMessage: HTTP_ERROR_VALIDATION,
        errors: fromPairs(errors.map(error => [error.property, Object.values(error.constraints)])),
      },
      HttpStatus.BAD_REQUEST,
    )
  }
  return mergedInstance
}
