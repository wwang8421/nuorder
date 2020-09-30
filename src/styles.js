import styled from "styled-components";

export const AppContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const MainContainer = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 500px;
  
  > select::-ms-expand {
    display: none;
  }
`;

export const SearchLabel = styled.label`
  font-weight: bold;
  margin-right: 10px;
  width: 100%;
  > span{
    display: flex;
    justify-content: center;
  }
  > input {
    width: 100%;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
`;

export const ResultWrapper = styled.div`
  cursor: pointer;
  border: 1px solid black;
  padding: 10px;
  background-color: ${({ active }) => active ? '#d3d3d3' : 'white'};
`;

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SecondaryWraper = styled.div`
  display: flex;
  > p {
    margin-right: 5px;
  };
  
  > p:last-of-type {
  margin-right: 0;
  };
`;
