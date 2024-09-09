import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Subject } from 'typeorm/persistence/Subject';


@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column()
  token: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  middle: string;

  @Column()
  surname: string;

  @Column({ nullable: true })
  role: string;

  @CreateDateColumn()
  createdDate: string;

  @Column({ nullable: true })
  course: string;

  @Column({ nullable: true })
  img: string;

  @Column({ nullable: true })
  faculty: string;

  @Column({ nullable: true })
  position: string;

  // // @ts-ignore
  // @OneToMany(() => Subject, (subject) => subject.user)
  // subject: Subject[];
}
