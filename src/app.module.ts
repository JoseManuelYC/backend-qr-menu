//Nest js dependencies
import { Module } from '@nestjs/common';

//Local files
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
