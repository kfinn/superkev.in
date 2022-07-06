import fs from 'fs';
import matter from 'gray-matter';
import _ from 'lodash';
import { join } from 'path';

export const POSTS_DIRECTORY = join(process.cwd(), '_posts');

export interface Post {
  slug: string;
  title: string;
  publishedAt: string;
}

export async function getPostsIndexStaticProps(): Promise<{ props: { posts: Post[] } }> {
  return {
    props: {
      posts: await Promise.all(
        _.map(
          await fs.promises.readdir(POSTS_DIRECTORY),
          async (path) => {
            const { data } = matter(await fs.promises.readFile(join(POSTS_DIRECTORY, path), 'utf8'));
            return {
              slug: _.replace(path, /\.md$/, ''),
              ..._.pick(data, 'title', 'publishedAt')
            }
          }
        )
      )
    }
  }
}
