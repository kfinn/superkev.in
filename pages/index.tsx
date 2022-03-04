import Head from "next/head";
import Link from "next/link";
import GithubListItem from "../components/GithubListItem";
import PartyBackground from "../components/PartyBackground";
import RequireMount from "../components/RequireMount";
import YoutubeListItem from "../components/YoutubeListItem";
import styles from "./index.module.css";

export default function Home() {
  return (
    <>
      <RequireMount>
        <PartyBackground />
      </RequireMount>
      <div className={styles.container}>
        <Head>
          <title>superkev.in</title>
          <meta
            name="description"
            content="superkev.in, the personal website of Kevin Finn"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="favicon.ico" />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="favicon-16x16.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="apple-touch-icon.png"
          />
          <link rel="manifest" href="site.webmanifest" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <Link href="/">superkev.in</Link>
          </h1>
          <div>The personal website of Kevin Finn</div>
          <ul>
            <GithubListItem />
            <li>
              <Link href="https://www.twitch.tv/superkevin627">Twitch</Link>:
              programming livestreams
            </li>
            <YoutubeListItem />
            <li>
              <Link href="https://instagram.com/charlie_dog_finn">
                Instagram
              </Link>
              : intermittently maintained photos of my dog, Charlie
            </li>
            <li>
              <Link href="https://linkedin.com/in/kevinhfinn">LinkedIn</Link>:
              employment history
            </li>
          </ul>
        </main>
      </div>
    </>
  );
};
