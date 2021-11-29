import React from 'react';

const IndSearchBook = (props) => {
    return (
        <div className='indBookCntr' onClick={props.onClick}>
            <div className='thumbnailBook'></div>

            <div className='mainInfoCntr'>
                <p className='indBookTitle'>Title of Book</p>

                <div className='authorGenreCntr'>
                    <p className='indBookAuthor'>Author of Book</p>
                    <p className='indBookGenre'>Genre Book</p>
                </div>
            
            </div>

         
        </div>
    );
}

export default IndSearchBook;