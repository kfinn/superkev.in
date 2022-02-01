import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import PartyBackground from "../components/PartyBackground";
import RequireMount from "../components/RequireMount";
import styles from "./index.module.css";

const Home: NextPage = () => {
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
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <Link href="/">superkev.in</Link>
          </h1>
          <div>The personal website of Kevin Finn</div>
          <ul>
            <li>
              <Link href="https://github.com/kfinn">GitHub</Link>: some code
              I&apos;ve written
            </li>
            <li>
              <Link href="https://www.twitch.tv/superkevin627">Twitch</Link>:
              sometimes I stream myself programming here
            </li>
            <li>
              <Link href="https://www.youtube.com/channel/UCI1DoNclLMm03_ZA4ncasyg">
                YouTube
              </Link>
              : some past programming streams
            </li>
            <li>
              <Link href="https://instagram.com/charlie_dog_finn">
                Instagram
              </Link>
              : I intermittently maintain an Instagram for my dog, Charlie
            </li>
            <li>
              <Link href="https://linkedin.com/in/kevinhfinn">LinkedIn</Link>:
              my employment history
            </li>
          </ul>
        </main>
      </div>
    </>
  );
};

export default Home;
