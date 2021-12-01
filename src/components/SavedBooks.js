import React from 'react';
import IndSavedBook from './IndSavedBook';

const SavedBooks = (props) => {
    let indBookCntr = [];  

    for (let i = 0; i < props.currentBooks.length; i++) {
      
      indBookCntr.push( <IndSavedBook book={props.currentBooks[i]} onClick={props.onClick} key={'IndSearchBook ' + i}/> );
    }

    const showCrrntSavedGroup = () => props.currentSavedGroup === 'General' ? 'Saved Books: General' : props.currentSavedGroup === 'Favorites' ? 'Saved Books: Favorites' : props.currentSavedGroup === 'To Read' ? 'Saved Books: To Read' : 'Saved Books';

    return (
        <div className='savedBooksCntr'>
        <p className='savedBooksHeading'>{showCrrntSavedGroup()}</p>

        <div className='booksCntr'>
            { indBookCntr }
        </div>
      </div>
    );
}

export default SavedBooks;