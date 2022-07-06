import fs from 'fs';
import matter from 'gray-matter';
import _ from 'lodash';
import { join } from 'path';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkPrism from 'remark-prism'
import { getPostsIndexStaticProps, Post, POSTS_DIRECTORY } from './index.api';

export type PostWithHtml = Post & { html: string }

const REMARK = remark().use(remarkPrism).use(remarkHtml, { sanitize: false })

export async function getPostsShowStaticProps(slug: string): Promise<{ props: { post: PostWithHtml } }> {
  const path = join(POSTS_DIRECTORY, `${slug}.md`)
  const { data, content } = matter(await fs.promises.readFile(path, 'utf8'));

  const html = (await REMARK.process(content)).toString()

  return {
    props: {
      post: {
        slug,
        html,
        ..._.pick(data, 'title', 'publishedAt'),
      }
    }
  }
}

export async function getPostsShowStaticPaths() {
  const { props: { posts } } = await getPostsIndexStaticProps()
  return {
    paths: _.map(posts, ({ slug }) => {
      return { params: { slug } }
    }),
    fallback: false
  }
}
