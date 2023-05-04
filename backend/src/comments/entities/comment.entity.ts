import { Content } from 'src/contents/entities/content.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  value: string;

  @ManyToOne(() => Content, (content) => content.id)
  content: Content;
}
