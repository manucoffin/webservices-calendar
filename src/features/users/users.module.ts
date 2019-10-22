import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../utils/database/database.module';
import { UserController } from './users.controller';
import { customRepository } from '../../utils/custom-repository.tools';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UsersService, customRepository(UsersRepository)],
  exports: [UsersService],
})
export class UsersModule {}
