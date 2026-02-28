import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useGitSearch } from "../hooks";
import type { Repository } from "../types/github";
import Cards from "./Cards";

const DateISO = new Date().toISOString().split("T")[0];
const Trend = () => {
  const navigate = useNavigate();
  const handleNavigateHome = () => {
    navigate("/");
  };

  const { isLoading, search, repositories, error } = useGitSearch();
  const [trendingRepos, setTrendingRepos] = useState<[Repository, number][]>(
    [],
  );

  /*
  0. at least 500 stars
  1. stars by today -> 70%
  2. folks -> 30%
  3. pushed at least today

  top 10
 add filter by languages

  */
  function sortRepositoriesByScore(repositories: Repository[]) {
    const MAX_FORK = Math.max(
      ...repositories.map((repo) => repo.forks_count),
      1,
    );
    const MAX_STAR = Math.max(
      ...repositories.map((repo) => repo.stargazers_count),
      1,
    );
    const STAR_BASE_SCORE = 0.7;
    const FORK_BASE_SCORE = 0.3;

    // id : score
    const scoreMap = new Map<Repository, number>();

    for (const repo of repositories) {
      const forkScore = (repo.forks_count * FORK_BASE_SCORE) / MAX_FORK;
      const starScore = (repo.stargazers_count * STAR_BASE_SCORE) / MAX_STAR;
      const score = Number(((forkScore + starScore) * 100).toFixed(2));
      console.log(`score of ${repo.id} is ${score}`);
      scoreMap.set(repo, score);
    }

    // sorting by score
    const sorted = [...scoreMap.entries()].sort((a, b) => b[1] - a[1]);
    console.log("sorted", sorted);
    setTrendingRepos(sorted);
  }

  useEffect(() => {
    search({ query: `stars:>5000 pushed:>=${DateISO} forks:>=300` });
  }, []);

  useEffect(() => {
    console.log("repositories hheheh s", repositories);
    sortRepositoriesByScore(repositories);
  }, [repositories]);

  return (
    <div>
      Trend
      <button onClick={handleNavigateHome}>BACK TO HOME</button>
      {error}
      <Cards
        isLoading={isLoading}
        repositories={trendingRepos.map((repoTuple) => repoTuple[0])}
      />
      {/* {trendingRepos.map((repoTuple) => (
        <div className="">
          <div className="">{repoTuple[0].name}</div>
          <div className="">{repoTuple[1]}</div>
        </div>
      ))} */}
    </div>
  );
};

export default Trend;
