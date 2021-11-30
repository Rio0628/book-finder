import React from 'react';
import IndSavedBook from './IndSavedBook';

const SavedBooks = (props) => {
    let indBookCntr = [];  

    for (let i = 0; i < props.currentBooks.length; i++) {
      
      indBookCntr.push( <IndSavedBook book={props.currentBooks[i]} onClick={props.onClick} key={'IndSearchBook ' + i}/> );
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