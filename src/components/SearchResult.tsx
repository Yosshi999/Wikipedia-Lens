import React from 'react';
import { SearchResultItem } from '../lib/wikipediaApi';

interface Props {
  query: string;
  results: SearchResultItem[];
  onClickResult: (heading: string) => void;
}

const SearchResult = React.memo<Props>(({query, results, onClickResult}) => {
  return (
    <>
      <div>
        {query && (
          <h2>{`Searching: ${query}`}</h2>
        )}
      </div>
      <div>
        {results.map(({ heading }) => (
          <div>
            <h3 onClick={() => onClickResult(heading)}>{heading}</h3>
          </div>
        ))}
      </div>
    </>
  );
});

export default SearchResult;