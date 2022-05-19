import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository:Repository<User>
  ) { }


  async getUser(id) {
      return await this.userRepository.findOne(id);
  }

  async resetPassword(user, password: string) {
    if (!user) {
      throw new BadRequestException({ msg: "Invalid Authentication." });
    }

    if (user.type !== 'register') {
      throw new BadRequestException({
        msg: `Quick login account with ${user.type} can't use this function.`
      });
    }
    const passwordHash = await bcrypt.hash(password, 12);
    await this.userRepository.update({id:user.id}, { password: passwordHash });

    return {msg:'success'};
  }

  async updateUser(user,data) {
    if (!user) {
      throw new BadRequestException({ msg: "Invalid Authentication." });
    }
    try {
      await this.userRepository.update({ id:user.id }, data)

      return { msg: "Update Success!" }
    } catch (error) {
      throw new InternalServerErrorException({ msg: error.message })
    }
  }

}
