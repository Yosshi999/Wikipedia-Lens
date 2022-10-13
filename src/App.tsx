import React, { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import { SingleTextViewer } from './components/TextViewer';
import { searchByName, SearchResultItem, getLatestRevision } from './lib/wikipediaApi';

type Page = {
  title: string;
  content: string;
  meta: {
    user: string;
    comment: string;
    sha1: string;
    timestamp: string;
  };
};

function App() {
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [page, setPage] = useState<Page | null>(null);

  const openPage = async (title: string) => {
    const data: any = await getLatestRevision(title);
    const article = data.query.pages[0];
    const rev = article.revisions[0];
    const meta = {
      user: rev.user, comment: rev.comment, sha1: rev.sha1, timestamp: rev.timestamp
    };
    setPage({ title: article.title, content: rev.slots.main.content, meta });
  };

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
      {(page === null) ? (
        <div>
          <h1> Wikipedia Lens </h1>
          <SearchBar onSubmit={(name) => setSearchTitle(name)} />
          <div>
            {searchTitle && (
              <h2>{`Searching: ${searchTitle}`}</h2>
            )}
          </div>
          <div>
            {searchResults.map(({ heading }) => (
              <div>
                <h3 onClick={() => openPage(heading)}>{heading}</h3>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2> {page.title} </h2>
          <SingleTextViewer
            content={page.content}
            {...page.meta}
          />
        </div>
      )
      }
    </div>
  );
}

export default App;
