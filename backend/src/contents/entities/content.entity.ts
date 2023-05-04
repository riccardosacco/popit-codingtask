import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Challenge } from '../../challenges/entities/challenge.entity';
import { Comment } from 'src/comments/entities/comment.entity';

@Entity()
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Challenge)
  challenge: Challenge;

  @OneToMany(() => Comment, (comment) => comment.content)
  comments: Comment[];

  @Column()
  image_url: string;

  @Column()
  likes: number;
}
