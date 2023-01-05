import React from 'react';
import styled from "styled-components";

const Container = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  border: 1px darkgray solid;
  border-radius: 6px;
`;

const CodeHead = styled.div`
  display: flex;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  padding: 5px;
  position: relative;

  margin: -1px -1px 0;
  border: 1px darkgray solid;
`;
const CommitInfoLeft = styled.div`
  display: flex;
`;
const CommitUser = styled.div`
  font-weight: bold;
  padding: 0 1em;
`;
const CommitComment = styled.div`
  color: gray;
  max-width: 70%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const CommitInfoRight = styled.div`
  display: flex;
  position: absolute;
  left: auto;
  right: 0;
`;
const CommitSha1 = styled.div`
  padding: 0 1em;
  color: gray;
`;
const CommitDate = styled.div`
  padding: 0 1em;
  color: gray;
`;

const CodeContainer = styled.div`
  border-bottom-left-radius: 6px;
`;

const LineBlock = styled.div`
  width: 100%;
  display: flex;

  &:last-child div:first-child {
    border-bottom-left-radius: 6px;
  }
`;

const LineNumber = styled.div`
  width: 1%;
  min-width: 3em;
  text-align: right;
  padding-right: 0.5em;
  background-color: #F5F5F5;
  color: #808080;
`;

const Code = styled.div`
  padding-left: 0.5em;
  text-align: left;
  width: 100%;
`;

interface Props {
  content: string;
  user: string;
  timestamp: string;
  sha1: string;
  comment: string;
  showBlame?: boolean;
};

export const SingleTextViewer = React.memo<Props>(({ content, user, timestamp, sha1, comment, showBlame }) => {
  const shortSha1 = sha1.slice(0, 7);
  return (
    <Container>
      <CodeHead>
        <CommitInfoLeft>
          <CommitUser>{user}</CommitUser>
          <CommitComment>{comment}</CommitComment>
        </CommitInfoLeft>
        <CommitInfoRight>
          Latest commit
          <CommitSha1>{shortSha1}</CommitSha1>
          on
          <CommitDate>{(new Date(timestamp)).toDateString()}</CommitDate>
        </CommitInfoRight>

      </CodeHead>
      <CodeContainer>{
        content.split("\n").map((line, index) => (
          <LineBlock key={index}>
            <LineNumber>{index + 1}</LineNumber>
            <Code>{line}</Code>
          </LineBlock>
        ))
      }</CodeContainer>
    </Container>
  )
});
