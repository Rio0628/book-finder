import React from 'react';

const IndBookView = (props) => {
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
                <select className='cllctnBook' onChange={props.onChange}>
                    <option>General</option>
                    <option>Favorite</option>
                    <option>To Read</option>
                </select>

                <div className='saveBtn' onClick={props.onClick}>Save Book</div>
            </div>

            <div className='addCommentCntr'>
                <input className='addComment' placeholder='Add Comment About Book...' onChange={props.onChange}/>

                <div className='addBtn' onClick={props.onClick}>Add Comment</div>
            </div>

            <div className='commentsCntr'>
                <div className='indComment'>This is a comment added by an user. <p onClick={props.onClick}>X</p></div>
                <div className='indComment'>This is a comment added by an user. <p>X</p></div>
                <div className='indComment'>This is a comment added by an user. <p>X</p></div>
            </div>
        </div>
    );
}

export default IndBookView;