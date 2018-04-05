import Router from "koa-router"

import { endpoints } from "../../../shared/constants/api-endpoints"
import { TokenCredentials } from "../../../shared/user/types/token-credentials"
import { HttpException } from "../common/http-exception"
import { UserModel } from "../user/user.model"
import { CharacterFields, CharacterModel } from "./character.model"

export function characterRoutes() {
  const router = new Router()

  router.post(endpoints.characters, async ctx => {
    const { name, token } = ctx.request.headers as TokenCredentials
    const user = await UserModel.findOne({ name })
    if (!user || !user.isTokenValid(token)) {
      throw new HttpException("Invalid or expired token", 401)
    }

    const fields = ctx.request.body as CharacterFields
    const character = await CharacterModel.create({ fields })
    ctx.body = character.serialize()
  })

  router.get(endpoints.character(":id"), async ctx => {
    const id = ctx.params.id as string
    const character = await CharacterModel.findById(id)
    if (!character) {
      throw new HttpException("Character not found", 404)
    }

    ctx.body = character.serialize()
  })

  router.get(endpoints.characters, async ctx => {
    const characterList = await CharacterModel.find()
    ctx.body = { characters: characterList.map(c => c.serialize()) }
  })

  router.put(endpoints.character(":id"), async ctx => {
    const { name, token } = ctx.request.headers as TokenCredentials
    const user = await UserModel.findOne({ name })
    if (!user || !user.isTokenValid(token)) {
      throw new HttpException("Invalid or expired token", 401)
    }

    const id = ctx.params.id as string

    const character = await CharacterModel.findById(id)
    if (!character) {
      throw new HttpException("Character not found", 404)
    }
    // if (!await characters.isCharacterOwner(name, id)) {
    //   throw new HttpException("You do not own this character.", 403)
    // }

    const fields = ctx.request.body as CharacterFields
    character.fields = fields
    await character.save()
    ctx.body = character.serialize()
  })

  router.delete(endpoints.character(":id"), async ctx => {
    const { name, token } = ctx.request.headers as TokenCredentials
    const user = await UserModel.findOne({ name })
    if (!user || !user.isTokenValid(token)) {
      throw new HttpException("Invalid or expired token", 401)
    }

    const id = ctx.params.id as string

    // if (!await characters.isCharacterOwner(name, id)) {
    //   throw new HttpException("You do not own this character.", 403)
    // }

    const result = await CharacterModel.findByIdAndRemove(id)
    if (!result) {
      throw new HttpException("Character not found", 404)
    }

    ctx.body = {}
  })

  return router.routes()
}
