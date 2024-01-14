import { Controller, Post, Body ,Get} from '@nestjs/common';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UserService } from '../service/users.service';
import { User } from '../user.interface';
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }
  @Get('all')
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
}