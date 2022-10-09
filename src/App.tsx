import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import { searchByName } from './lib/wikipediaApi';

type SearchResultItem = {
  heading: string,
  abst: string,
  link: string
};

function App() {
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const search = (name: string) => {
    setSearchTitle(name);
    if (name) {
      searchByName(name).then((data) => {
        const headings: string[] = data[1];
        const absts: string[] = data[2];
        const links: string[] = data[3];
        setSearchResults(headings.map((heading, i) => ({heading, abst: absts[i], link: links[i]})))
      })
    }
  }

  return (
    <div className="App">
      <h1> Wikipedia Lens </h1>
      <SearchBar onSubmit={(name) => search(name)} />
      <div>
        {searchTitle && (
          <h2>{`Searching: ${searchTitle}`}</h2>
        )}
      </div>
      <div>
        {searchResults.map(({heading, abst}) => (
          <div>
            <h3>{heading}</h3>
            <h4>{abst}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
