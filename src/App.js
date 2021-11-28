import React, { Component } from 'react';
import Axios from 'axios';
import { AiOutlineMenu } from 'react-icons/ai'
import { AiOutlineClose } from 'react-icons/ai'
import { BiSearchAlt } from 'react-icons/bi'
import IndBookView from './components/IndBookView';
import SavedBooks from './components/SavedBooks';
import SearchRsltBooks from './components/SearchRsltBooks';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sidebarOn: false,
      searchOn: false,
      indBookViewOn: false,      
    }
  }
  
  render () {
    
    const handleSidebar = async () => {
      await this.setState({ sidebarOn: !this.state.sidebarOn })

      if (this.state.sidebarOn === true ) {
        this.setState({ sidebarStatus: 'active'});
      }
      else { this.setState({ sidebarStatus: '' } )};
    }

    const handleSearchbar = () => {
      this.setState({ searchOn: !this.state.searchOn });
    }

    const onClick = (e) => {
      console.log(e.target.className)

      
    } 


    console.log(this.state.sidebarOn)
    console.log(this.state.searchOn)
    // Axios.get(`https://www.googleapis.com/books/v1/volumes?q=harry+potter`).then(data => console.log(data) );

    return (
      <div className="container">

        <div className='nav-barCntr'>
          <AiOutlineMenu className='sidebarBtn' onClick={handleSidebar}/>
          
          {this.state.searchOn ? 
            <div className='searchbarCntr'>
              <input className='searchbar' placeholder='Search Book...'></input>
              <BiSearchAlt className='searchBtn' onClick={handleSearchbar}/>
            </div>
          :  <BiSearchAlt className='searchBtnCls' onClick={handleSearchbar}/> }
         
        </div>

        <div className={'sidebar ' + this.state.sidebarStatus }>
          <AiOutlineClose className='sidebarBtnOpen' onClick={handleSidebar}/>

          <div className='categoriesCntr'>
            <p className='category'>Search Book</p>
            <p className='category'>Saved Books</p>
            <p className='category'>General</p>
            <p className='category'>Favorites</p>
            <p className='category'>To Read</p>
          </div>
        </div>

        {/* <div className='sidebarHrzntl'>
          <div className='categoriesCntr'>
            <p className='category'>Search Book</p>
            <p className='category'>Saved Books</p>
            <p className='category'>General</p>
            <p className='category'>Favorites</p>
            <p className='category'>To Read</p>
          </div>
        </div> */}

        
        <SearchRsltBooks />
        {/* <IndBookView /> */}
        {/* <SavedBooks /> */}

       
      
      </div>
    );
  }
}

export default App;
