import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Unique,
} from 'typeorm';


@Entity()
@Unique(['course', 'faculty', 'time', 'day'])
export class Schedule extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  createdDate: string;

  @Column()
  course: string;

  @Column()
  faculty: string;

  @Column()
  time: string;

  @Column()
  userId: string;

  @Column({ nullable: true })
  name: string;

  @Column()
  day: string;
}
