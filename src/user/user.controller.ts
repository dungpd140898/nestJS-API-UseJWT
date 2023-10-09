import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get()
  async getAllBooks(): Promise<User[]> {
    return this.userService.findAll();
  }
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    const user = await this.userService.validateUser(email, password);

    if (!user) {
      return { message: 'Invalid credentials' };
    }
    // Tạo và trả về JWT token
    return this.authService.login(user);
  }
  @Post()
  async createBook(
    @Body()
    user: CreateUserDto,
  ): Promise<User> {
    return this.userService.create(user);
  }

  @Get(':id')
  async getBook(
    @Param('id')
    id: string,
  ): Promise<User> {
    return this.userService.findById(id);
  }

  @Put(':id')
  async updateBook(
    @Param('id')
    id: string,
    @Body()
    user: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateById(id, user);
  }

  @Delete(':id')
  async deleteBook(
    @Param('id')
    id: string,
  ): Promise<User> {
    return this.userService.deleteById(id);
  }
}
