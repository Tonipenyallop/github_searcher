import type { Repository } from "./github";

export type TrendingRepos = [Repository, number][];
export type TrendingData = { repositoryName: string; score: number };
