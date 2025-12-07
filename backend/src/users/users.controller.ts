import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';  

@Controller('users')        
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Create a user (public)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // List all users
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }
}
