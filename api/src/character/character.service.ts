import { Session } from "neo4j-driver/types/v1"

import { Character, CharacterFields } from "./types/character"

export class CharacterService {
  constructor(private session: Session) {}

  async getById(id: string): Promise<Character | void> {
    const query = `
      match (c:Character { id: {id} })
      return properties(c) as props
    `
    const { records } = await this.session.run(query, { id })
    const record = records[0]
    if (record) {
      const props = record.get("props")
      return { id: props.id, fields: JSON.parse(props.fields) }
    }
  }

  async getAll(/* filters? */): Promise<Character[]> {
    const query = `
      match (c:Character)
      return properties(c) as props
    `
    const { records } = await this.session.run(query)
    return records.map(r => {
      const props = r.get("props")
      return { id: props.id, fields: JSON.parse(props.fields) }
    })
  }

  async create(
    ownerUsername: string,
    id: Character["id"],
    fields: CharacterFields,
  ): Promise<Character> {
    const query = `
      match (u:User { username: {ownerUsername} })
      create ((u)-[:OWNS]->(c:Character { id: {id}, fields: {fields} }))
      return properties(c) as props
    `
    const { records } = await this.session.run(query, {
      ownerUsername,
      id,
      fields: JSON.stringify(fields),
    })

    const props = records[0].get("props")
    return { id: props.id, fields: JSON.parse(props.fields) }
  }

  async isCharacterOwner(ownerUsername: string, characterId: Character["id"]): Promise<boolean> {
    const query = `
      match ((:User { username: {ownerUsername} })-[:OWNS]->(:Character { id: {characterId} }))
      return true
    `
    const { records } = await this.session.run(query, { ownerUsername, characterId })
    return records.length > 0
  }

  async update(id: Character["id"], fields: CharacterFields): Promise<void> {
    const query = `
      match (c:Character { id: {id} })
      set c.fields = {fields}
    `
    await this.session.run(query, { id, fields: JSON.stringify(fields) })
  }

  async delete(username: string, id: Character["id"]) {
    const query = `
      match ((:User { username: {username} })-[r:OWNS]->(c:Character { id: {id} }))
      delete r
      delete c
    `
    await this.session.run(query, { username, id })
  }
}
