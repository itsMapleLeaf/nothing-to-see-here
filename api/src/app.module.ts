import { Module } from "@nestjs/common"

import { AuthController } from "./auth.controller"
import { AuthService } from "./user.service"
import { DatabaseService } from "./database.service"

@Module({
  imports: [],
  controllers: [AuthController],
  components: [DatabaseService, AuthService],
})
export class AppModule {}
