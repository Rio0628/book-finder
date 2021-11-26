import React from 'react';
import IndSavedBook from './IndSavedBook';

const SavedBooks = () => {
    return (
        <div className='savedBooksCntr'>
        <p className='savedBooksHeading'>Saved Books</p>

        <div className='booksCntr'>
            <IndSavedBook /> 
            <IndSavedBook /> 
            <IndSavedBook /> 
            <IndSavedBook /> 
        </div>
      </div>
    );
}

export default SavedBooks;