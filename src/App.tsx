import { useCallback, useState } from "react";
import { useGitSearch } from "./hooks";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  // debugger;
  const { repositories, error, search, isLoading } = useGitSearch();
  const handleSearch = useCallback(async () => {
    await search(query);
  }, [search, query]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setQuery(e.target.value);
  }, []);
  return (
    <div className="">
      <input type="text" onChange={handleChange} />
      <button onClick={handleSearch}>fire</button>
      {error}
      {isLoading ? (
        "LOADING CONTENT"
      ) : (
        <div className="">
          {repositories.map((repository) => {
            return (
              <div className="">
                <div className=""> hellow</div>
                <img src={repository.owner?.avatar_url} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
