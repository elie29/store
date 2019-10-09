import { State } from '../../src';
import { Author } from './author.model';
import { Post } from './post.model';

/**
 * A State is equivalent to the store content
 */
export interface BasicState extends State {
  post: Post | null;
  posts: Post[];
  author?: Author;
  loading: boolean;
}

/**
 * Default Initial Application/Service State
 */
export const INITIAL_STATE: BasicState = {
  post: null,
  posts: [],
  author: undefined,
  loading: false
};
