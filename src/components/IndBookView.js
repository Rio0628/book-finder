import React from 'react';

const IndBookView = (props) => {
    let commentsCntr = [];

    console.log(props.book)
    
    for (let i = 0; i < props.book.comments.length; i++ ) {
        commentsCntr.push(  <div className='indComment' key={'Comment ' + i}>{props.book.comments[i]}<p className='removeCmmntBtn' comment={props.book.comments[i]}>X</p></div> );
    }

    const changeCategory = () => {
        if (props.book.savedGroup) {
            return props.book.savedGroup
        }
        else return 'General'
    }

    const setChangeClass = () => {
        if (props.isSaved) { return ' saved'}
        else return ' ';
    }
    
    return (
        <div className='indBookView'>

            <img className='thumbnail' src={props.book.thumbnail} alt='thumbnail'></img>

            <p className='titleBook'>{props.book.title}</p>
            <p className='authorBook'>{props.book.author}</p>
        
            <div className='dateGenreCntr'>
                <p className='genreBook'>{props.book.category}</p>
                <p className='publishDateBook'>{props.book.publishDate}</p>
            </div>

            <p className='descriptionBook'>{props.book.description}</p>

            <div className='saveBookCntr'>
                <select className='cllctnBook' defaultValue={changeCategory()} onChange={props.onChange}>
                    <option>General</option>
                    <option>Favorite</option>
                    <option>To Read</option>
                </select>

                <div className={'saveBtn' + setChangeClass()} onClick={props.onClick}>{props.isSaved ? 'Book Saved' : 'Save Book'}</div>
            </div>

            <div className='addCommentCntr'>
                <input className='addComment' placeholder='Add Comment About Book...' onChange={props.onChange}/>

                <div className='addBtn' onClick={props.onClick}>Add Comment</div>
            </div>

            <div className='commentsCntr'>
                {commentsCntr}
            </div>
        </div>
    );
}

export default IndBookView;