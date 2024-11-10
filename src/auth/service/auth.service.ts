import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from '../dto';

const db = [
  {
    id: 1,
    username: 'jose',
    password: 'password',
  },
  {
    id: 2,
    username: 'jose2',
    password: 'password2',
  },
];

@Injectable()
export class AuthService {
  validateUser(authPayloadDto: AuthPayloadDto) {
    const findUser = db.find(
      (user) => user.username === authPayloadDto.username,
    );

    if (!findUser) return null;

    if (findUser.password === authPayloadDto.password) {
      return true;
    }
  }
}
