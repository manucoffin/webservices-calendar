import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UsersRepository) private readonly usersRepository: UsersRepository,
  ) {}

  /**
   * Returns a hashed string
   * @param password
   * @returns Hashed string
   */
  public async getHash(password: string | undefined): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  /**
   * Creates a new instance of User in the database
   * @param user
   * @returns Resolves with a created User
   */
  async create(user: User) {
    const newUser = user;
    newUser.password = await this.getHash(user.password);
    return this.usersRepository.save(newUser);
  }

  /**
   * Return all articles
   * @returns Resolves with a list of 20 articles
   */
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  /**
   * Return a user identified by its email
   * @param email
   * @returns Resolves with User
   */
  async findOneByEmail(email: string): Promise<User[]> {
    return this.usersRepository.find({
      where: { email },
    });
  }

  /**
   * Returns a user identified by its id
   * @param id
   * @returns Resolves with a User
   */
  async findOneById(id): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  /**
   * Update the authenticated user in database
   * @param userId
   * @param user
   * @throws {ForbiddenException} - If trying to update with an existing email
   * @returns Updated user
   */
  async update(userId: string, user: User) {
    if (user.email) {
      const existingUser = await this.findOneByEmail(user.email);
      // If the user tries to update with an existing email
      if (existingUser[0] && existingUser[0].id !== userId) {
        throw new ForbiddenException('Cet email est déjà utilisé.');
      }
    }

    const updatedUser = user;
    if (user.password) {
      updatedUser.password = await this.getHash(user.password);
    }
    // return this.usersRepository.save(updatedUser);

    return this.usersRepository.update(userId, { ...updatedUser });
  }

  /**
   * Remove an user from the database
   * @param userId
   * @returns Resolves with a useless object
   */
  async delete(userId: string): Promise<any> {
    return this.usersRepository.delete(userId);
  }
}
