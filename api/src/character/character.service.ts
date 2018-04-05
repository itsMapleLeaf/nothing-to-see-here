import { Session } from "neo4j-driver/types/v1"

import { Character } from "./types/character"

export class CharacterService {
  constructor(private session: Session) {}

  async getCharacterById(id: string): Promise<Character | void> {
    const query = `
      match (c:Character { id: {id} })
      return properties(c) as character
    `
    const { records } = await this.session.run(query, { id })
    const record = records[0]
    if (record) {
      return record.get("character") as Character
    }
  }

  async create(ownerUsername: string, characterData: Character): Promise<Character> {
    const query = `
      match (u:User { username: {ownerUsername} })
      create ((u)-[:OWNS]->(:Character $characterData))
    `
    await this.session.run(query, { ownerUsername, characterData })
    return characterData
  }

  async isCharacterOwner(ownerUsername: string, characterId: Character["id"]): Promise<boolean> {
    const query = `
      match ((:User { username: {ownerUsername} })-[:OWNS]->(:Character { id: {characterId} }))
      return true
    `
    const { records } = await this.session.run(query, { ownerUsername, characterId })
    return records.length > 0
  }

  async update(characterData: Character): Promise<void> {
    const query = `
      match (c:Character { id: {id} })
      set c = $characterData
    `
    await this.session.run(query, { id: characterData.id, characterData })
  }

  async delete(username: string, id: Character["id"]) {
    const query = `
      match ((:User { username: {username} })-[r:OWNS]->(c:Character { id: {id} }))
      delete r
      delete c
    `
    await this.session.run(query, { username, id })
  }

  async getAll(/* filters? */): Promise<Character[]> {
    const query = `
      match (c:Character)
      return properties(c) as props
    `
    const { records } = await this.session.run(query)
    return records.map(r => r.get("props"))
  }
}
