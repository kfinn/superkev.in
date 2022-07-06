import React from "react";
import moment from "moment";
import {
  getPostsShowStaticPaths,
  getPostsShowStaticProps,
  PostWithHtml,
} from "../../lib/posts/[slug].api";
import Link from "next/link";
import styles from "./[slug].module.css";
import GentlePartyBackground from "../../components/GentlePartyBackground";
import RequireMount from "../../components/RequireMount";

export default function PostsShow({
  post: { slug, title, publishedAt, html },
}: {
  post: PostWithHtml;
}) {
  return (
    <>
      <RequireMount>
        <GentlePartyBackground />
      </RequireMount>
      <div className={styles.main}>
        <h1>{title}</h1>
        <Link href={`/posts/${slug}`}>
          <a>
            <span className={styles.publishedAt}>
              {moment(publishedAt).calendar()}
            </span>
          </a>
        </Link>
        <article dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </>
  );
}

export async function getStaticProps({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return getPostsShowStaticProps(slug);
}

export async function getStaticPaths() {
  return getPostsShowStaticPaths();
}
