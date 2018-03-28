import { SchemaLike, validate } from "joi"

import { TypedRequestHandler } from "./express-types"

export function validateBody<BodyType>(
  schema: SchemaLike,
  handler: TypedRequestHandler<BodyType>,
): TypedRequestHandler<BodyType> {
  return async (req, res, next) => {
    const validationResult = validate(req.body, schema)
    if (validationResult.error) {
      return res.status(400).send({ error: validationResult.error.details[0].message })
    }
    handler(req, res, next)
  }
}
