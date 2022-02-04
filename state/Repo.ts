import _ from "lodash";

export interface Repo {
  id: string;
  name: string;
  html_url: string;
  description: string;
}

export async function fetchRepos(): Promise<Repo[]> {
  const response = await fetch(
    "https://api.github.com/users/kfinn/repos?type=public&sort=pushed&direction=desc&per_page=3"
  );
  const rawRepos = await response.json() as Repo[];
  return _.map(rawRepos, (repo) => _.pick(repo, 'id', 'name', 'html_url', 'description'));
}
