import React from 'react';

const IndBookView = () => {
    return (
        <div className='indBookView'>

            <div className='thumbnail'></div>

            <p className='titleBook'>Title For Book</p>
            <p className='authorBook'>Author</p>
        
            <div className='dateGenreCntr'>
                <p className='genreBook'>Genre</p>
                <p className='publishDateBook'>00/00/0000</p>
            </div>

            <p className='descriptionBook'>This is the description of the book </p>

            <div className='saveBookCntr'>
                <select className='cllctnBook'>
                    <option>General</option>
                    <option>Favorite</option>
                    <option>To Read</option>
                </select>

                <div className='saveBtn'>Save Book</div>
            </div>

            <div className='addCommentCntr'>
                <input className='addComment' placeholder='Add Comment About Book...'/>

                <div className='addBtn'>Add Comment</div>
            </div>

            <div className='commentsCntr'>
                <p className='indComment'>This is a comment added by an user. <p>X</p></p>
            </div>
        </div>
    );
}

export default IndBookView;