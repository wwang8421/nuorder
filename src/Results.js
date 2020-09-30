import React from 'react';
import styled from 'styled-components';

export const ResultWrapper = styled.div`
  border: 1px solid black;
  padding: 10px;
  //width: 500px;
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SecondaryWraper = styled.div`
  display: flex;
  > p {
    margin-right: 5px;
  };
  
  > p:last-of-type {
  margin-right: 0;
  };
`;

// const ColorListboxSelect = ({ results }) => {
//
//     // const { handleOpenOptions, openOptions, currentAllele, selectRef } = props;
//     return (
//         {results.map()}
//     );
// };
// export default ColorListboxSelect;

    //     <div
    //         tabIndex="0"
    //         role="button"
    //         onClick={handleOpenOptions}
    //         onKeyDown={handleOpenOptions}
    //         aria-pressed={openOptions}
    //         aria-expanded={openOptions}
    //         className="select-allele"
    //         // Use the `ref` callback to store a reference to the text input DOM
    //         // element in the DOM
    //         ref={selectRef}
    //     >
    //         {currentAllele === undefined ? (
    //             "Select an Allele"
    //         ) : (
    //             <span>
    //  <span>{currentAllele}</span>
    //  <span aria-hidden="true" style={{ color: currentAllele }}>&#9632;</span>
    // </span>
    //         )}
    //     </div>

const ResultsDropDown = ({ results }) => {
    return(
        <>
            {console.log('results', results)}
            {results && results.map(({ user, title, comments_url, updated_at, number }) => (
                <Result key={number} user={user} title={title} commentsURL={comments_url} updatedAt={updated_at} number={number} />
             ))}
        </>
    )
};

export const Result = ({ commentsURL, number, updatedAt, user, title }) => {
    const dateFormatter = () => {

    };
    return(
        <ResultWrapper>
            <MainWrapper>
            <h5>{title}</h5>
            <SecondaryWraper>
                <p>#{number}</p>
                {/*<p>opened {new Date(updatedAt)} minutes ago</p>*/}
                <p>by {user?.login}</p>
            </SecondaryWraper>
            </MainWrapper>

        </ResultWrapper>
    )
};
export default ResultsDropDown;
