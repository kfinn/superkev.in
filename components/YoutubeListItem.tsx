import Link from "next/link";

export default function YoutubeListItem() {
  return (
    <>
      <li>
        <Link href="https://www.youtube.com/channel/UCI1DoNclLMm03_ZA4ncasyg">
          YouTube
        </Link>
        : recordings of past programming livestreams, such as...
        <ul>
          <li>
            <Link href="https://www.youtube.com/watch?v=rsHRnxZpggE">
              Implementing HTTP in Jai
            </Link>
          </li>
          <li>
            <Link href="https://www.youtube.com/watch?v=htTwTus_zhQ">
              Exploring web protocols in Jai: SCGI, HTTP, and WebSockets
            </Link>
          </li>
          <li>
            <Link href="https://www.youtube.com/watch?v=b0xwrB-nRYY">
              Rendering JSON in Jai
            </Link>
          </li>
        </ul>
      </li>
    </>
  );
}
