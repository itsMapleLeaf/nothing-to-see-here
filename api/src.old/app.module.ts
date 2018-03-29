import { Module } from "@nestjs/common"

import { AuthController } from "./auth.controller"
import { DatabaseService } from "./database.service"
import { UserService } from "./user.service"

@Module({
  imports: [],
  controllers: [AuthController],
  components: [DatabaseService, UserService],
})
export class AppModule {}
