import _ from "lodash";
import Link from "next/link";
import { useQuery } from "react-query";
import styles from "./RecentGithubRepos.module.css";

interface Repo {
  id: string;
  name: string;
  html_url: string;
  description: string;
}

export default function RecentGithubRepos() {
  const { isLoading, data, error } = useQuery("github_repos", async () => {
    const response = await fetch(
      "https://api.github.com/users/kfinn/repos?type=public&sort=pushed&direction=desc&per_page=3"
    );
    return (await response.json()) as Repo[];
  });

  if (isLoading || error) {
    return <></>;
  }

  return (
    <ul>
      {_.map(data, (repo: Repo) => (
        <li key={repo.id}>
          <Link href={repo.html_url}>{repo.name}</Link>
          {": "}
          {repo.description || (
            <span className={styles.unknownDescription}>
              a project I haven&apos;t written a description for yet
            </span>
          )}
          {repo.name === "superkev.in" && (
            <span className={styles.thisWebsiteDescriptionSuffix}>
              {" "}
              (this website)
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
