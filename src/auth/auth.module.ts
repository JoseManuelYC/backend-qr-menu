//Nest js dependencies
import { Module } from '@nestjs/common';

//Local files
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
