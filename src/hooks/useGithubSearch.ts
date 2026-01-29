import { Octokit } from "@octokit/core";
import { useCallback, useState } from "react";
import type { OctokitResponse, Repository, Sort } from "../types/github";

export function useGitSearch() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [repositories, setRepositories] = useState<Array<Repository>>([]);
  const search = useCallback(
    async (
      query: string,
      sort: Sort,
      order: number,
      per_page: number,
      page: number,
    ) => {
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
          },
        );

        setRepositories(response.data.items);
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
  };
}
