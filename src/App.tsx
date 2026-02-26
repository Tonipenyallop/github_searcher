import { useCallback, useEffect, useState } from "react";
import { useGitSearch } from "./hooks";
import "./App.css";
import Pagination from "./components/Pagination";
import type { SearchInput } from "./types/github";

const DEFAULT_MAX_VAL_PER_PAGE = 30;

function App() {
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

  return (
    <div className="app">
      <div className="header">
        <h2 className="title">Github Searcher</h2>
        <div className="input-container">
          <input className="search-input" type="text" onChange={handleChange} />
          <button
            className="search-button"
            disabled={!query.trim()}
            onClick={handleSearch}
          >
            SEARCH
          </button>
        </div>
      </div>
      {error}
      {isLoading ? (
        "LOADING CONTENT..."
      ) : (
        <div className="repository-container">
          {repositories.map((repository) => {
            return (
              <div className="">
                <div className="">{repository.name}</div>
                <img src={repository.owner?.avatar_url} />
                <a href={repository.owner?.html_url} target="__blank">
                  {repository.owner?.html_url}
                </a>
              </div>
            );
          })}
        </div>
      )}

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
