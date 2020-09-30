import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { AppContainer, SecondaryWraper, MainContainer, MainWrapper, ResultWrapper, SearchContainer, SearchLabel } from "./styles";

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
    const [openDropdown, setOpenDropdown] = useState(false);
    const [results, setResults] = useState([]);
    const [cursor, setCursor] = useState(0);

    const fetchFacebookGithubIssues = async(input) => {
        if(input.length > 0){
          try{
              setError(false);
              setLoading(true);
              const header = { 'Accept': 'application/vnd.github.v3.text-match+json' };
              const newInputValue = input.split(' ').join('+');
              const { data: { items } } = await axios.get(`https://api.github.com/search/issues?q=${newInputValue}+repo:facebook/react+in:title`, {
                  header: header,
              });
              setResults(items);
          } catch(e){
              setError(true);
          } finally{
              setLoading(false);
          }
        }
    };

    const debounced = useCallback(debounce((input) => fetchFacebookGithubIssues(input), 500), []);

    const handleSearch = (e) => {
        setInputValue(e.target.value);
        debounced(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 38 && cursor > 0) {
            setCursor(cursor => cursor - 1);
        } else if (e.keyCode === 40 && cursor < results.length - 1) {
            setCursor(cursor => cursor + 1);
        } else if(e.keyCode === 13) {
            console.log('cursor', cursor);
            console.log(results[cursor]);
            window.open(`https://github.com/facebook/react/issues/${results[cursor]?.number}`, "_blank");
        }
    };

    const handleKeyDownDropdown = (e) => {
        if(e.key === 'Enter'){
            handleClick();
        }
    }

    const handleClick = (e, number) => {
        window.open(`https://github.com/facebook/react/issues/${number}`, "_blank");
        setInputValue("");
    };

    const handleInputClick = (e) => {
      e.stopPropagation();
      setOpenDropdown(true);
    };

  return (
    <AppContainer onClick={() => setOpenDropdown(false)}>
      <header>
        <h1>Facebook Search Issue</h1>
      </header>
      <MainContainer>
          <SearchContainer>
              <SearchLabel htmlFor="search">
                  <span>
                    Issue Search
                  </span>
                <input name="search" id="search" list="issues" autoComplete="off" value={inputValue} onChange={handleSearch} onKeyDown={handleKeyDown} onClick={handleInputClick}/>
              </SearchLabel>
          </SearchContainer>
          {loading && <div>Loading....</div>}
          {!loading && error ? (<p>Error in getting results: Please Search again</p>) : (
              <>
              {!loading && openDropdown && results && results.map(({ number, updated_At, user, title}, index) => (
                 <div key={number} tabIndex="0" onClick={handleClick} onKeyDown={handleKeyDownDropdown}>
                     <Result handleKeyDownDropdown={handleKeyDownDropdown} handleClick={handleClick} active={cursor === index} number={number} updatedAt={updated_At} user={user} title={title}/>
                 </div>
              ))}
              </>
          )}
      </MainContainer>
    </AppContainer>
  );
};

export const Result = ({ handleKeyDownDropdown, handleClick, active, number, user, title }) => {
    return(
        <ResultWrapper tabIndex={1} active={active} onClick={(e) => handleClick(e, number)} onKeyDown={e => handleKeyDownDropdown(e)}>
            <MainWrapper>
                <h5>{title}</h5>
                <SecondaryWraper>
                    <p>#{number}</p>
                    <p>by {user?.login}</p>
                </SecondaryWraper>
            </MainWrapper>

        </ResultWrapper>
    )
};


export default App;
