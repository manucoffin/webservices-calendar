import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { getCopyConstructions } from '../../../utils/copy-constructor.tools';

@Entity()
export class User {
  @Column({ type: 'text', name: 'firstname' })
  firstname: string;

  @Column({ type: 'text', name: 'lastname' })
  lastname: string;

  @CreateDateColumn()
  created: Date;

  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  // constructor() {
  //   this.author = getCopyConstruction(User, copy.author);
  // }
}
