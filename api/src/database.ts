import { connect, connection } from "mongoose"

import { databaseUrl } from "./env"

export function connectToDatabase() {
  connect(databaseUrl).catch(console.error)

  connection
    .on("open", () => console.info("connected to database"))
    .on("error", error => console.error("database error:", error))
}
