import { Octokit } from "@octokit/core";
import { useCallback, useState } from "react";
import type { OctokitResponse, Repository, Sort } from "../types/github";

const MAX_REPO_AVAILABLE = 1000;

export function useGitSearch() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [repositories, setRepositories] = useState<Array<Repository>>([]);
  const [totalItems, setTotalItems] = useState(0);
  interface SearchInput {
    query: string;
    sort: Sort;
    order?: number;
    per_page: number;
    page: number;
  }
  const search = useCallback(
    async ({
      query,
      sort = "desc",
      order,
      per_page = 10,
      page = 1,
    }: SearchInput) => {
      const octokit = new Octokit();
      setIsLoading(true);
      console.log("query", query);
      try {
        const response: OctokitResponse = await octokit.request(
          "GET /search/repositories",
          {
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
            },
            q: query,
            // per_page,
            page,
            // sort,
          },
        );

        setRepositories(response.data.items);
        // Only the first 1000 search results are available - https://docs.github.com/v3/search/
        setTotalItems(Math.min(response.data.total_count, MAX_REPO_AVAILABLE));
        setError("");
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return {
    search,
    error,
    isLoading,
    repositories,
    totalItems,
  };
}
