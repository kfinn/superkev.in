import _ from "lodash";
import Link from "next/link";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { fetchRepos, Repo } from "../state/Repo";
import styles from "./GithubListItem.module.css";

export default function GithubListItem({
  staticRepos,
}: {
  staticRepos: Repo[];
}) {
  const { data: fetchedRepos, isFetched } = useQuery(
    "github_repos",
    fetchRepos
  );

  const repos = useMemo(
    () => (isFetched && fetchedRepos ? fetchedRepos : staticRepos),
    [isFetched, fetchedRepos, staticRepos]
  );

  return (
    <>
      <li>
        <Link href="https://github.com/kfinn">GitHub</Link>: programming
        projects{_.some(repos) && ", such as..."}
      </li>
      {_.some(repos) && (
        <ul>
          {_.map(repos, (repo: Repo) => (
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
      )}
    </>
  );
}
