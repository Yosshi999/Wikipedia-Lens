import React, { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import { searchByName, SearchResultItem } from './lib/wikipediaApi';

function App() {
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  useEffect(() => {
    if (searchTitle) {
      searchByName(searchTitle).then((data) => {
        setSearchResults(data);
      })
    } else {
      setSearchResults([]);
    }
  }, [searchTitle]);

  return (
    <div className="App">
      <h1> Wikipedia Lens </h1>
      <SearchBar onSubmit={(name) => setSearchTitle(name)} />
      <div>
        {searchTitle && (
          <h2>{`Searching: ${searchTitle}`}</h2>
        )}
      </div>
      <div>
        {searchResults.map(({heading, link}) => (
          <div>
            <a href={link}>{heading}</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
