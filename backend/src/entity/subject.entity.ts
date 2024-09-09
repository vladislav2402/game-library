import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';


@Entity()
export class Subject extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  description: string;

  @Column()
  faculty: string;

  @CreateDateColumn()
  createdDate: string;

  @Column()
  time: string;

  @Column()
  day: string;

  @Column()
  course: string;

  @Column({ nullable: true })
  userId: string;

  // @ManyToOne(() => User, (user) => user.subject)
  // user: User;
}
