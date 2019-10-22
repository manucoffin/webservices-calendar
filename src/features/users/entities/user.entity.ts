import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  getCopyConstructions,
  getOrDefault,
} from '../../../utils/copy-constructor.tools';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ type: 'varchar', name: 'first_name', length: 100 })
  firstName: string;

  @Column({ type: 'varchar', name: 'last_name', length: 100 })
  lastName: string;

  @Column({ type: 'varchar', name: 'email', length: 200 })
  email: string;

  @Column({ type: 'varchar', name: 'password' })
  password: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  constructor(copy: Partial<User> = {}) {
    this.email = getOrDefault(copy.email, '');
    this.password = getOrDefault(copy.password, '');
    this.lastName = getOrDefault(copy.lastName, '');
    this.firstName = getOrDefault(copy.firstName, '');
    this.id = getOrDefault(copy.id, undefined);
  }
}
