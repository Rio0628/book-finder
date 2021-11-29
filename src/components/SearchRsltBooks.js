import React from 'react';
import IndSearchBook from './IndSearchBook';

const SearchRsltBooks = (props) => {
  let indBookCntr = [];  

  for (let i = 0; i < 7; i++) {
    indBookCntr.push( <IndSearchBook onClick={props.onClick} key={'IndSearchBook ' + i}/> );
  }
  
  return (
    <div className='searchBooksCntr'>
      <p className='searchRsltsHeading'>Results: Name Of Book</p>

      <div className='booksCntr'>
        { indBookCntr }
      </div>
          
    </div>
  );
}

export default SearchRsltBooks;