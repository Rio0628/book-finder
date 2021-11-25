import React, { Component } from 'react';
import Axios from 'axios';
import { AiOutlineMenu } from 'react-icons/ai'
import { BiSearchAlt } from 'react-icons/bi'
 
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

        <h1>Hello</h1>
      </div>
    );
  }
}

export default App;
