import { Content } from 'src/contents/entities/content.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Challenge {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  tags: string;

  @OneToMany(() => Content, (content) => content.user)
  contents: Content[];
}
