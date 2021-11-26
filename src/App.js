import React, { Component } from 'react';
import Axios from 'axios';
import { AiOutlineMenu } from 'react-icons/ai'
import { AiOutlineClose } from 'react-icons/ai'
import { BiSearchAlt } from 'react-icons/bi'
import IndSearchBook from './components/IndSearchBook'

class App extends Component {
  render () {
    
    // Axios.get(`https://www.googleapis.com/books/v1/volumes?q=harry+potter`).then(data => console.log(data) );

    return (
      <div className="container">

        <div className='nav-barCntr'>
          <AiOutlineMenu className='sidebarBtn'/>

          {/* <BiSearchAlt className='searchBtnCls'/> */}

          <div className='searchbarCntr'>
            <input className='searchbar' placeholder='Search Book...'></input>
            <BiSearchAlt className='searchBtn'/>
          </div>
        </div>

        <div className='searchBooksCntr'>
          <p className='searchRsltsHeading'>Results: Name Of Book</p>

          <div className='booksCntr'>
            <IndSearchBook />
            <IndSearchBook />
            <IndSearchBook />
            <IndSearchBook />
            <IndSearchBook />
            <IndSearchBook />
          </div>
        </div>
        
        {/* <div className='sidebar'>
          <AiOutlineClose className='sidebarBtnOpen'/>

          <div className='categoriesCntr'>
            <p className='category'>Search Book</p>
            <p className='category'>Saved Books</p>
          </div>
        </div> */}
      
      </div>
    );
  }
}

export default App;
