import React, { useState, useRef, useEffect, useCallback, lazy, Suspense } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ResultsDropDown from './Results';

const AppContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const MainContainer = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 500px;
  
  > select::-ms-expand {
    display: none;
  }
`;

const SearchLabel = styled.label`
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

const SearchContainer = styled.div`
  display: flex;
`;

const debounce = (fn, wait) => {
  let id = null;
  let context = this;
  return function(...args) {
     id && clearTimeout(id);

     id = setTimeout(() => {
        fn.apply(context, args);
     }, wait);
  };
};

const App = () => {
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [results, setResults] = useState([]);
    const inputRef = useRef();


    // `https://api.github.com/search/issues?q=stress+test+label:bug+language:python+state:closed&page=1&per_page=100`
    const fetchFacebookGithubIssues = async() => {
      try{
          const { data } = await axios.get(`https://api.github.com/search/isues/q=repo:facebook/react+type:issue+Error`)
      } catch(e){
          setError(true);
      }
    };

    const debounced = useCallback(debounce(fetchFacebookGithubIssues, 500), [inputValue]);

        useEffect(() => {
        const fetchFacebookGithubIssues = async () => {
            try{
                setLoading(true);
                setError(false);
                const header = { 'Accept': 'application/vnd.github.v3.text-match+json' };
                // const { data } = await axios.get(`https://api.github.com/search/issues/q=tree+org:facebook+repo:facebook/react+in:title`, {
                //     header: header,
                // });
                // console.log('data', data);
                const { data } = await axios.get(`https://api.github.com/repos/facebook/react/issues?page=1&per_page=100`);
                setResults(data);
            } catch(e) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchFacebookGithubIssues()
    }, []);

    // useEffect(() => {
    //     debounce(fetchFacebookGithubIssues, 500);
    // }, [inputValue]);

    const handleSearch = (e) => {
        setInputValue(e.target.value);
        // debounce(filterResults, 500);
    };

    const handleClick = (e, url = "http://www.google.com/") => {
        // window.open(url);
        window.open(url, "_blank");
        setInputValue("");
    };

    const filterResults = () => {
        // let newResults = results.filter()
    };

  return (
    <AppContainer>
      <header>
        <h1>Facebook Search Issue</h1>
      </header>
      <MainContainer>
          <SearchContainer>
              <SearchLabel htmlFor="search">
                  <span>
                    Issue Search
                  </span>
                <input name="search" id="search" list="issues" autoComplete="off" value={inputValue} onChange={handleSearch} />
                {/*<button onClick={handleClick}>Click</button>*/}
              </SearchLabel>
          </SearchContainer>

          {error ? (<p>Error in getting results: Please Search again</p>) : (
              <>
              {results && results.map((result) => (
                 <div>
                     {console.log('results')}
                 </div>
              ))}
              </>
          )}
      </MainContainer>
    </AppContainer>
  );
};

              // <Suspense fallback={<div>Loading...</div>}>
              //     <ResultsDropDown results={results} />
              // </Suspense>

export default App;
