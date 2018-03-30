import { connectToDatabase } from "./database"
import { runServer } from "./server"

async function main() {
  const session = await connectToDatabase()
  await runServer(session)
}

main().catch(console.error)
