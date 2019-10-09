import { Author } from './author.model';

export interface Post {
  id: number;
  author?: Author;
  date?: Date;
}
