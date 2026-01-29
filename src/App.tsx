import { useCallback, useState } from "react";
import { useGitSearch } from "./hooks";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const { repositories, error, search, isLoading } = useGitSearch();
  const handleSearch = useCallback(async () => {
    await search(query);
  }, [search, query]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setQuery(e.target.value);
  }, []);
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
    </div>
  );
}

export default App;
