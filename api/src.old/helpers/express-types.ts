import { NextFunction, Request, Response } from "express"

export interface TypedRequest<BodyType> extends Request {
  body: BodyType
}

export type TypedRequestHandler<BodyType> = (
  req: TypedRequest<BodyType>,
  res: Response,
  next: NextFunction,
) => any
