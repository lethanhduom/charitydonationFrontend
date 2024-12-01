import React from 'react';
import styled from 'styled-components';

const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: #f0f0f0;
  border-radius: 10px;
  height: 10px;
  margin: 10px 0;
`;

const Progress = styled.div`
  width: ${(props) => props.completed}%;
  background-color: #f86422;
  height: 100%;
  border-radius: 10px;
  transition: width 0.5s ease-in-out;
`;

const ProgressBar = ({ completed }) => {
  return (
    <ProgressBarContainer>
      <Progress completed={completed} />
    </ProgressBarContainer>
  );
};

export default ProgressBar;
