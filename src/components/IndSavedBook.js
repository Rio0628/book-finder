import React from 'react';

const IndSavedBook = () => {
    return (
        <div className='indBookCntr'>
            <div className='thumbnailBook'></div>

            <div className='mainInfoCntr'>
                <p className='indBookTitle'>Title of Book</p>

                <div className='authorGenreCntr'>
                    <p className='indBookAuthor'>Author of Book</p>
                    <p className='indBookGenre'>Genre Book</p>
                    <p className='indBookCategory'>Collection</p>
                </div>
            </div>

            <div className='removeBtn'>Remove</div>

         
        </div>
    );
}

export default IndSavedBook;