import React from 'react';
import IndSavedBook from './IndSavedBook';

const SavedBooks = (props) => {
    let indBookCntr = [];  

    for (let i = 0; i < 7; i++) {
      indBookCntr.push( <IndSavedBook onClick={props.onClick} key={'IndSearchBook ' + i}/> );
    }

    return (
        <div className='savedBooksCntr'>
        <p className='savedBooksHeading'>Saved Books</p>

        <div className='booksCntr'>
            { indBookCntr }
        </div>
      </div>
    );
}

export default SavedBooks;