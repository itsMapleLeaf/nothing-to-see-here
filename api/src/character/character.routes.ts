import Router from "koa-router"
import { endpoints } from "../../../shared/constants/api-endpoints"
import {
  TokenCredentials,
  tokenCredentialsSchema,
} from "../../../shared/user/types/token-credentials"
import { validate } from "../common/helpers/validate"
import { HttpException } from "../common/http-exception"
import { UserModel } from "../user/user.model"
import { CharacterModel } from "./character.model"
import { CharacterFields, characterFieldsSchema } from "./types/character-fields"

export function characterRoutes() {
  const router = new Router()

  router.post(endpoints.characters, async ctx => {
    const { name } = await validateTokenCredentialsInHeader(ctx)

    const fields = validate<CharacterFields>(
      ctx.request.body,
      characterFieldsSchema,
      "Body validation failed",
    )

    const character = await CharacterModel.create({ fields, ownerName: name })
    ctx.body = character.serialize()
  })

  router.get(endpoints.character(":id"), async ctx => {
    const id = ctx.params.id as string
    const character = await findCharacter(id)
    ctx.body = character.serialize()
  })

  router.get(endpoints.characters, async ctx => {
    const { owner, limit } = ctx.query

    let query = CharacterModel.find().limit(Number(limit) || 10)

    if (owner) {
      query = query.find({ ownerName: owner })
    }

    const queryResult = await query

    ctx.body = { characters: queryResult.map(c => c.serialize()) }
  })

  router.put(endpoints.character(":id"), async ctx => {
    await validateTokenCredentialsInHeader(ctx)

    const id = ctx.params.id as string

    const character = await findCharacter(id)

    // if (!await characters.isCharacterOwner(name, id)) {
    //   throw new HttpException("You do not own this character.", 403)
    // }
    const fields = validate<CharacterFields>(
      ctx.request.body,
      characterFieldsSchema,
      "Body validation failed",
    )

    character.fields = fields

    await character.save()

    ctx.body = character.serialize()
  })

  router.delete(endpoints.character(":id"), async ctx => {
    await validateTokenCredentialsInHeader(ctx)

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

async function findCharacter(id: string) {
  const character = await CharacterModel.findById(id)
  if (!character) {
    throw new HttpException("Character not found", 404)
  }
  return character
}

async function validateTokenCredentials({ name, token }: TokenCredentials) {
  const user = await UserModel.findOne({ name })
  if (!user || !user.isTokenValid(token)) {
    throw new HttpException("Invalid or expired token", 401)
  }
  return user
}

function validateTokenCredentialsInHeader(ctx: Router.IRouterContext) {
  const credentials = validate<TokenCredentials>(
    ctx.request.headers,
    tokenCredentialsSchema,
    "Header validation failed",
  )
  return validateTokenCredentials(credentials)
}
