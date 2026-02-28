export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  forks_count: number;
  language: string | null;
  owner: {
    login: string;
    avatar_url: string;
    url: string;
    html_url: string;
  } | null;
  stargazers_count: number;
}

export interface OctokitResponse {
  data: {
    incomplete_results: boolean;
    total_count: number;
    items: Array<Repository>;
  };
}

export type Sort = "desc" | "asc";

export interface SearchInput {
  query: string;
  sort: Sort;
  order?: number;
  per_page: number;
  page: number;
}
