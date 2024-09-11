import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UserProfile } from './profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserProfile)
    private profileRepository: Repository<UserProfile>
  ) {}

  async createUser(user: CreateUserDto){
    const userFound = await this.usersRepository.findOneBy({ username: user.username });
    if (userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  getUsers() {
    return this.usersRepository.find();
  }

  async getUser(id: number){
    console.log("Holu");
    const userFound = await this.usersRepository.findOne({
      where: {
        userId:id
      },
      relations: ['userPosts']
    });
    
    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return userFound;
  }

  async deleteUser(id:number){
    const result = await this.usersRepository.delete({ userId: id })
    if (result.affected === 0){
      return new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    return result;
  }

  async updateUser(id:number, user: UpdateUserDto) {
    const userFound = await this.usersRepository.findOneBy({ userId:id});
    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return this.usersRepository.update({userId: id}, user);
  }

  async findOne(username: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ username });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

 async createProfile(id: number, profile:CreateProfileDto) {
    const userFound = await this.usersRepository.findOneBy({ userId:id});
    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

   const newProfile = this.profileRepository.create(profile);
   const savedProfile = await this.profileRepository.save(newProfile);

   userFound.profile = savedProfile;

   return this.usersRepository.save(userFound);
   
   
  }
}
