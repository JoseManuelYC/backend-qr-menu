//nest js dependencies
import { Body, Controller, Post } from '@nestjs/common';

//Local files
import { AuthPayloadDto } from '../dto';

@Controller('auth')
export class AuthController {
  @Post(':login')
  signIn(@Body() authPayloadDto: AuthPayloadDto) {}
}
