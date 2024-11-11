//nest js dependencies
import { Body, Controller, Get, Post } from '@nestjs/common';

//Local files
import { LoginAuthDto, RegisterAuthDto } from '../dto';
import { AuthService } from '../service';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Get('login')
  login(@Body() userLoginObject: LoginAuthDto) {
    return this._authService.login(userLoginObject);
  }

  @Post('register')
  register(@Body() userObject: RegisterAuthDto) {
    return this._authService.register(userObject);
  }
}
