import { SchemaLike, validate as joiValidate } from "joi"
import { HttpException } from "../http-exception"

export function validate<T>(values: any, schema: SchemaLike, errorPrefix: string): T {
  const validationResult = joiValidate(values, schema)
  if (validationResult.error) {
    throw new HttpException(`${errorPrefix}: ${validationResult.error.details[0].message}`, 400)
  }
  return values
}
