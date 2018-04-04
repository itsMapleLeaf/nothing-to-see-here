import Router from "koa-router"

import { endpoints } from "../../../shared/constants/api-endpoints"
import { notImplemented } from "../common/middleware/not-implemented"

export function characterRoutes() {
  const router = new Router()

  router.get(endpoints.character(":id"), notImplemented())
  router.post(endpoints.character(":id"), notImplemented())
  router.patch(endpoints.character(":id"), notImplemented())
  router.delete(endpoints.character(":id"), notImplemented())

  router.get(endpoints.characters, notImplemented())

  return router.routes()
}
