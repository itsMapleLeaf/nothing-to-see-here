import { Module } from "@nestjs/common"

import { AuthController } from "./auth.controller"
import { DatabaseService } from "./database.service"

@Module({
  imports: [],
  controllers: [AuthController],
  components: [DatabaseService],
})
export class AppModule {}
