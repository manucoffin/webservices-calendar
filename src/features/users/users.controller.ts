import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@ApiUseTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @ApiCreatedResponse({
    description: 'User created.',
  })
  async create(@Req() req, @Body() createUserDto: CreateUserDto) {
    const user = new User(createUserDto);
    return this.usersService.create(user);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Users list returned.',
  })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'User found and returned.',
  })
  @ApiNotFoundResponse({
    description: 'User not found.',
  })
  async getById(@Param('id') userId: string) {
    return this.usersService.findOneById(userId);
  }

  @Put(':id')
  @ApiCreatedResponse({
    description: 'User updated and returned.',
  })
  @ApiForbiddenResponse({
    description: 'Email already in use.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  async update(
    @Req() req,
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const toUpdateUser = new User(updateUserDto);
    // Set-req-user middleware sets the connected user id in the request object
    // toUpdateUser.id = req.payload.token.uuid;
    return this.usersService.update(userId, toUpdateUser);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'User deleted.',
  })
  async delete(@Param('id') userId: string) {
    return this.usersService.delete(userId);
  }
}
