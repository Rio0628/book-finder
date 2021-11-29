import React from 'react';
import { BiSearchAlt } from 'react-icons/bi';

const IndBookViewSB = (props) => {
    return (
        <div>
            { props.searchOn ? 
                <div className='searchbarCntr'>
                    <input className='searchbar' placeholder='Search Book...' onChange={props.onChange}></input>
                    <BiSearchAlt className='searchBtn' onChange={props.onChange} onClick={props.searchBooks}/>
                </div>
            : <BiSearchAlt className='searchBtnCls' onClick={props.handleSearchbar}/> } 
        </div>
    );
}

export default IndBookViewSB;