import React from 'react';
import IndSearchBook from './IndSearchBook';

const SearchRsltBooks = (props) => {
  let indBookCntr = [];  

  for (let i = 0; i < props.resultBooks.length; i++) {
    indBookCntr.push( <IndSearchBook number={i} bookInfo={props.resultBooks[i]} onClick={props.onClick} key={'IndSearchBook ' + i}/> );
  }
  
  return (
    <div className='searchBooksCntr'>
      <p className='searchRsltsHeading'>Results: {props.searchInput}</p>

      <div className='booksCntr'>
        { indBookCntr }
      </div>
          
    </div>
  );
}

export default SearchRsltBooks;