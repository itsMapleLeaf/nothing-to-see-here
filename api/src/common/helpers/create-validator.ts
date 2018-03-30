import { Schema, validate } from "joi"

class ServerValidationError extends Error {
  code = 400

  constructor(message: string) {
    super(message)
  }
}

export function createValidator<T>(schema: Record<keyof T, Schema>) {
  return (value: any): T => {
    const result = validate<T>(value, schema)
    if (result.error.details.length > 0) {
      throw new ServerValidationError(result.error.details[0].message)
    }
    return value
  }
}
