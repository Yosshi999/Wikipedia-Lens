import React from 'react';
import styled from 'styled-components';
import { SearchResultItem } from '../lib/wikipediaApi';

interface Props {
  query: string;
  results: SearchResultItem[];
  onClickResult: (heading: string) => void;
}

const ListContainer = styled.ul`
  text-align: start;
`;
const ListOption = styled.li`
  list-style: none;
  margin: 1em 0;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: lightgray;
  }
`;
const OptionThumbnail = styled.span`
  display: inline-flex;
  width: 40px;
  height: 40px;
  border: 1px black solid;
  align-items: center;
  justify-content: center;
`;
const OptionText = styled.span`
  margin-left: 0.5em;
  display: inline-grid;
`;
const OptionHeading = styled.span`
`;
const OptionAbst = styled.span`
  color: darkgray;
`;

const SearchResult = React.memo<Props>(({query, results, onClickResult}) => {
  return (
    <>
      <div>
        {query && (
          <h2>{`Searching: ${query}`}</h2>
        )}
      </div>
      <ListContainer role="listbox" aria-multiselectable="false" aria-label="search result">
        {results.map(({ heading, abst }) => (
          <ListOption onClick={() => onClickResult(heading)}>
            <OptionThumbnail>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
                <g>
                  <line x1="0" y1="0" x2="40" y2="40" stroke="gray" stroke-width="1" />
                  <line x1="0" y1="40" x2="40" y2="0" stroke="gray" stroke-width="1" />
                </g>
              </svg>
            </OptionThumbnail>
            <OptionText>
              <OptionHeading>{ heading }</OptionHeading>
              <OptionAbst>{ abst }</OptionAbst>
            </OptionText>
          </ListOption>
        ))}
      </ListContainer>
    </>
  );
});

export default SearchResult;