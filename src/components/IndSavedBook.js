import React from 'react';

const IndSavedBook = (props) => {
    return (
        <div className='indBookCntr' id='indBookSaved' book={props.book._id} onClick={props.onClick}>
            <img className='thumbnailBook' src={props.book.thumbnail} alt='Thumbnail Book'></img>

            <div className='mainInfoCntr'>
                <p className='indBookTitle'>{props.book.title}</p>

                <div className='authorGenreCntr'>
                    <p className='indBookAuthor'>{props.book.author}</p>
                    <p className='indBookGenre'>{props.book.category}</p>
                    <p className='indBookCategory'>{props.book.savedGroup}</p>
                </div>
            </div>

            <div className='removeBtn' book={props.book._id}>Remove</div>

         
        </div>
    );
}

export default IndSavedBook;