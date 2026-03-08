import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useGitSearch } from "../hooks";
import type { Repository } from "../types/github";
import Cards from "./Cards";

import BarChart from "./BarChart";

type TrendingRepos = [Repository, number][];

const Trend = () => {
  const navigate = useNavigate();
  const handleNavigateHome = () => {
    navigate("/");
  };

  const { isLoading, search, repositories, error } = useGitSearch();
  const [trendingRepos, setTrendingRepos] = useState<TrendingRepos>([]);
  const [data, setData] = useState<[[string, number]] | null>(null);
  const [countDown, setCountDown] = useState<number>(0);

  type Mode = "bar" | "card";

  const [mode, setMode] = useState<Mode>("bar");

  const handleModeChange = () => {
    if (mode === "bar") {
      setMode("card");
    } else if (mode === "card") {
      setMode("bar");
    } else {
      throw new Error("Unknown mode found");
    }
  };

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

  function processRepositoryData({
    trendingRepos,
  }: ProcessRepositoryDataInput) {
    const out: [{ repositoryName: string; score: number }] = [];
    trendingRepos.forEach((trendingRepo) => {
      out.push({
        repositoryName: trendingRepo[0].name,
        score: trendingRepo[1],
      });
    });

    setData(out);
  }

  const ONE_MINUTE_SECONDS = 60;

  useEffect(() => {
    const getTrendingRepos = () => {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
      const iso = fiveMinutesAgo.toISOString();
      search({ query: `stars:>5000 pushed:>=${iso} forks:>=300` });
    };

    getTrendingRepos();
    setCountDown(ONE_MINUTE_SECONDS);

    const intervalId = setInterval(() => {
      setCountDown((prev) => {
        if (prev <= 1) {
          getTrendingRepos();
          return ONE_MINUTE_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!repositories) {
      return;
    }
    sortRepositoriesByScore(repositories);
  }, [repositories]);

  useEffect(() => {
    if (!trendingRepos) {
      return;
    }
    processRepositoryData({ trendingRepos });
  }, [trendingRepos]);

  interface ProcessRepositoryDataInput {
    trendingRepos: TrendingRepos;
  }

  return (
    <div className="trend-page">
      <div className="trend-header">
        <h2 className="trend-title">Trending</h2>
        <div className="trend-controls">
          <button className="" onClick={handleNavigateHome}>
            BACK TO HOME
          </button>
          <button className="btn-toggle" onClick={handleModeChange}>
            {mode === "bar" && <span>Card View</span>}
            {mode === "card" && <span>Chart View</span>}
          </button>
        </div>
      </div>
      {error && <div className="error-message">{error}</div>}
      {mode === "card" && (
        <Cards
          isLoading={isLoading}
          repositories={trendingRepos.map((repoTuple) => repoTuple[0])}
          scores={trendingRepos.map((repoTuple) => repoTuple[1])}
        />
      )}
      {mode === "bar" && (
        <div className="chart-section">
          <h2 className="chart-tip">💡Trend Updated Every Minutes💡</h2>
          <div className="countdown-container">
            <h3>Next Fetch In </h3>
            <h3 className="countdown">{countDown}</h3>
            <h3>s</h3>
          </div>
          <BarChart data={data ?? []} />
        </div>
      )}
    </div>
  );
};

export default Trend;
