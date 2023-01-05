import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import SearchResult from '../components/SearchResult';
import { SingleTextViewer } from '../components/TextViewer';
import { searchByName, SearchResultItem } from '../lib/wikipediaApi';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Body = styled.div`
  display: block;
`;

function Home() {
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const navigate = useNavigate();

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
    <Container>
      <Body>
        <h1> Wikipedia Lens </h1>
        <SearchBar onSubmit={(name) => setSearchTitle(name)} />
        <SearchResult
          query={searchTitle}
          results={searchResults}
          onClickResult={(title) => navigate("article/" + title)}
        />
      </Body>
    </Container>
  );
}

export default Home;