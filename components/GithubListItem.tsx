import Link from "next/link";

export default function GithubListItem() {
  return (
    <>
      <li>
        <Link href="https://github.com/kfinn">GitHub</Link>: programming
        projects, such as...
      </li>
      <ul>
        <li>
          <Link href="https://github.com/kfinn/super-ruby">super-ruby</Link>: An
          experimental programming language called super, implemented in Ruby
        </li>
        <li>
          <Link href="https://github.com/kfinn/hecks">hecks</Link>: Online
          multiplayer implementation of the board game Settlers of Catan
        </li>
        <li>
          <Link href="https://github.com/kfinn/PartyTime">PartyTime</Link>: Turn
          your HomeKit lights into a party!
        </li>
      </ul>
    </>
  );
}
