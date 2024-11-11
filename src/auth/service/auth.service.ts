//Nestjs dependencies
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';

//External dependencies
import { Model } from 'mongoose';
import { hash, compare } from 'bcrypt';

//Local files
import { LoginAuthDto, RegisterAuthDto } from '../dto';
import { User } from '../../user/schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private _userModel: Model<User>,
    private _jwtService: JwtService,
  ) {}

  async register(userObject: RegisterAuthDto) {
    const { username, password } = userObject;

    const userFound = await this._userModel.findOne({
      username,
    });

    if (userFound)
      throw new HttpException(
        `Username: ${username} already exist`,
        HttpStatus.BAD_REQUEST,
      );

    const plainToHash = await hash(password, 10);

    userObject = { ...userObject, password: plainToHash };

    return await this._userModel.create(userObject);
  }

  async login(userLoginDto: LoginAuthDto) {
    const { username, password } = userLoginDto;

    const user = await this._userModel.findOne({
      username,
    });

    if (!user)
      throw new HttpException(
        `Username: ${username} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );

    const checkPassword = await compare(password, user.password);

    if (!checkPassword)
      throw new HttpException(`Invalid Password`, HttpStatus.FORBIDDEN);

    const payload = { id: user.id, username: user.username };

    const token = this._jwtService.sign(payload);

    const data = {
      user: {
        id: user.id,
        username: user.username,
      },
      token,
    };

    return data;
  }
}
