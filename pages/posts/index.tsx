import React from 'react';
import _ from 'lodash';
import Link from "next/link";
import { getPostsIndexStaticProps, Post } from '../../lib/posts/index.api';

export default function PostsIndex({ posts }: { posts: Post[] }) {
  return <div>
    <h1>Posts</h1>
    <ul>
      {
        _.map(posts, (post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))
      }
    </ul>
  </div>
}

export async function getStaticProps() {
  return await getPostsIndexStaticProps();
}
