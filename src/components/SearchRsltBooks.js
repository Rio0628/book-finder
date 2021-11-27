import React from 'react';
import IndSearchBook from './IndSearchBook';

const SearchRsltBooks = () => {
    return (
        <div className='searchBooksCntr'>
          <p className='searchRsltsHeading'>Results: Name Of Book</p>

          <div className='booksCntr'>
                <IndSearchBook />
                <IndSearchBook />
                <IndSearchBook />
                <IndSearchBook />
                <IndSearchBook />
                <IndSearchBook />
          </div>
          
        </div>
    );
}

export default SearchRsltBooks;