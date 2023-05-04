import { Challenge } from 'src/challenges/entities/challenge.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateContentDto {
  user: User;
  challenge: Challenge;
  image_url: string;
  likes: number;
}
