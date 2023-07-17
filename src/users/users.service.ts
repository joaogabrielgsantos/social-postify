import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async addUser(data: CreateUserDTO) {
        const hashPassword = bcrypt.hashSync(data.password, 10)
        const user = await this.usersRepository.findUserByEmail(data.email);
    if (user)
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
        await this.usersRepository.addUser({ ...data, password: hashPassword })
    }
}
