import React from 'react';

const IndSearchBook = (props) => {

    // Function to only show the first three authors of a book
    const authorsUpdt = () => {
        if (props.bookInfo.author) {
            if (props.bookInfo.author.length === 1) { return `${props.bookInfo.author[0]}`};
            if (props.bookInfo.author.length === 2) { return `${props.bookInfo.author[0]},  ${props.bookInfo.author[1]}`};
            if (props.bookInfo.author.length === 3) { return `${props.bookInfo.author[0]},  ${props.bookInfo.author[1]},  ${props.bookInfo.author[2]}`};
        }
        else { return 'No Author'}
    }

    const getThumbnail = () => {
        if (props.bookInfo.thumbnail) { return props.bookInfo.thumbnail.thumbnail}
        else return '';
    }

    return (
        <div className='indBookCntr' id='indBookSearch'  book={props.number} onClick={props.onClick}>
            <img className='thumbnailBook' src={getThumbnail()} alt='thumbail'></img>

            <div className='mainInfoCntr'>
                <p className='indBookTitle'>{props.bookInfo.title}</p>

                <div className='authorGenreCntr'>
                    <p className='indBookAuthor'>{authorsUpdt()}</p>
                    <p className='indBookGenre'>{props.bookInfo.category ? props.bookInfo.category : 'No genre available'}</p>
                </div>
            
            </div>

         
        </div>
    );
}

export default IndSearchBook;