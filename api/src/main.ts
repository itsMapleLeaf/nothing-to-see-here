import { NestFactory } from "@nestjs/core"

import { AppModule } from "./app.module"
import { port } from "./env"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(port)
  console.info(`listening on http://localhost:${port}`)
}
bootstrap().catch(console.error)
