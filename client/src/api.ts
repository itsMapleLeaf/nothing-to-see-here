export interface Character {
  id: string
  name: string
  profile: string
}

const characters = {
  athena: {
    id: "athena",
    name: "Athena",
    profile: "some random loli witch",
  },
  tora: {
    id: "tora",
    name: "Tora",
    profile: "invents stuff",
  },
  alysia: {
    id: "alysia",
    name: "Alysia",
    profile: "cute dragon that likes girls",
  },
  amber: {
    id: "amber",
    name: "Amber",
    profile: "lazy dragon that likes girls",
  },
  bell: {
    id: "bell",
    name: "Bell",
    profile: "soft-spoken kitsunemimi who only wants to get things done",
  },
}

function sleep(ms: number) {
  return new Promise<void>(resolve => setTimeout(resolve, ms))
}

export async function getCharacterList(): Promise<Character[]> {
  await sleep(250)
  return Object.values(characters).sort((a, b) => a.name.localeCompare(b.name))
}

export async function getCharacter(id: string): Promise<Character> {
  await sleep(250)
  return characters[id]
}

export async function updateCharacter(id: string, fields: Partial<Character>) {
  await sleep(250)
  characters[id] = { ...characters[id], ...fields }
}
