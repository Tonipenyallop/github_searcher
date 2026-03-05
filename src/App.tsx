import { useCallback, useEffect, useState } from "react";
import { useGitSearch } from "./hooks";
import "./App.css";
import Pagination from "./components/Pagination";
import type { SearchInput } from "./types/github";
import { useNavigate } from "react-router";
import Cards from "./components/Cards";

const DEFAULT_MAX_VAL_PER_PAGE = 30;

function App() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [curPage, setCurPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const { repositories, error, search, isLoading, totalItems } = useGitSearch();

  useEffect(() => {
    // gotta check max boundary
    setLastPage(Math.ceil(totalItems / DEFAULT_MAX_VAL_PER_PAGE + curPage));
  }, [totalItems, curPage]);

  useEffect(() => {
    setItemsPerPage(Math.ceil(totalItems / DEFAULT_MAX_VAL_PER_PAGE));
  }, [totalItems]);

  const handleSearch = useCallback(async () => {
    await search({ query, page: curPage } as SearchInput);
  }, [search, query, curPage]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setQuery(e.target.value);
    // reset page when the query updated
    setCurPage(1);
  }, []);

  const handlePagination = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      const index = Number((event.target as HTMLElement).innerText ?? "0");
      setCurPage(index);
      await handleSearch();
    },
    [handleSearch],
  );

  const handleNavigateTrend = () => {
    navigate("/trend");
  };

  const TIPS = [
    ["Category", "Example"],
    ["Popular repos", "stars:>=500 language:typescript"],
    ["By language", "language:rust forks:>=100"],
    ["Recently active", " pushed:>2026-01-01 stars:>200"],
    ["By topic", "topic:machine-learning stars:>50 "],
    ["Specific scope", `in:readme "getting started"`],
    ["Size filter", "size:<50 language:go"],
  ];

  return (
    <div className="app">
      <div className="header">
        <h2 className="title">Github Searcher</h2>
        <div className="nav-row">
          <button className="btn-secondary" onClick={handleNavigateTrend}>
            TO TREND
          </button>
        </div>

        <div className="tips">
          <h2 className="tip-header">💡TIPS💡</h2>
          {TIPS.map((tip) => {
            const [category, example] = tip;
            return (
              <div className="tip-container">
                <div className="category">{category}</div>
                <div className="example">{example}</div>
              </div>
            );
          })}
        </div>

        <div className="input-container">
          <input
            className="search-input"
            type="text"
            placeholder="Search repos"
            onChange={handleChange}
          />
          <button
            className="search-button"
            disabled={!query.trim()}
            onClick={handleSearch}
          >
            SEARCH
          </button>
        </div>
      </div>
      {error && <div className="error-message">{error}</div>}
      <Cards isLoading={isLoading} repositories={repositories} />

      {repositories.length > 0 && (
        <Pagination
          curPage={curPage}
          lastPage={lastPage}
          handlePagination={handlePagination}
          totalItems={totalItems}
        />
      )}
    </div>
  );
}

export default App;
