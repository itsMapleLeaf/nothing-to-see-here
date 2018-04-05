import Router from "koa-router"

import { endpoints } from "../../../shared/constants/api-endpoints"
import { TokenCredentials } from "../../../shared/user/types/token-credentials"
import { HttpException } from "../common/http-exception"
import { UserService } from "../user/user.service"
import { CharacterService } from "./character.service"
import { CharacterFields } from "./types/character"

export function characterRoutes(characters: CharacterService, users: UserService) {
  const router = new Router()

  router.get(endpoints.character(":id"), async ctx => {
    const id = ctx.params.id as string
    const character = await characters.getById(id)
    if (!character) {
      throw new HttpException("Character not found", 404)
    }

    ctx.body = character
  })

  router.post(endpoints.character(":id"), async ctx => {
    const { username, token } = ctx.request.headers as TokenCredentials
    if (!await users.isTokenValid(username, token)) {
      throw new HttpException("Invalid or expired token", 401)
    }

    const id = ctx.params.id as string
    const fields = ctx.request.body as CharacterFields
    const character = await characters.create(username, id, fields)

    ctx.body = character
  })

  router.put(endpoints.character(":id"), async ctx => {
    const { username, token } = ctx.request.headers as TokenCredentials
    if (!await users.isTokenValid(username, token)) {
      throw new HttpException("Invalid or expired token", 401)
    }

    const id = ctx.params.id as string
    if (!await characters.isCharacterOwner(username, id)) {
      throw new HttpException("You do not own this character.", 403)
    }

    const fields = ctx.request.body as CharacterFields
    const character = await characters.update(id, fields)

    ctx.body = character
  })

  router.delete(endpoints.character(":id"), async ctx => {
    const { username, token } = ctx.request.headers as TokenCredentials
    if (!await users.isTokenValid(username, token)) {
      throw new HttpException("Invalid or expired token", 401)
    }

    const id = ctx.params.id as string
    if (!await characters.isCharacterOwner(username, id)) {
      throw new HttpException("You do not own this character.", 403)
    }

    await characters.delete(username, id)

    ctx.body = {}
  })

  router.get(endpoints.characters, async ctx => {
    const characterList = await characters.getAll()
    ctx.body = { characters: characterList }
  })

  return router.routes()
}
