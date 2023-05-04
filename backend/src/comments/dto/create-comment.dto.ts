import { Content } from 'src/contents/entities/content.entity';

export class CreateCommentDto {
  value: string;
  content: Content;
}
