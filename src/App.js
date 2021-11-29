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
      searchView: true,
      savedBooks: false,
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

    const searchBooks = () => {
      this.setState({ searchOn: !this.state.searchOn });
      this.setState({ indBookViewOn: false });
      this.setState({ savedBooksView: false });
      this.setState({ searchView: true });
    }

    const setSavedBooksView = () => {
      this.setState({ indBookViewOn: false });
      this.setState({ searchView: false });
      this.setState({ savedBooksView: true });
    };

    const onClick = (e) => {
      console.log(e.target.className)

      if (e.target.className === 'category') {
        if (e.target.id === 'searchBook') {
          this.setState({ indBookViewOn: false });
          this.setState({ savedBooksView: false });
          this.setState({ searchView: true });
        }
        if (e.target.id === 'savedBooks') {
          setSavedBooksView();
        }
        if (e.target.id === 'general') {
          setSavedBooksView();
        }
        if (e.target.id === 'favorites') {
          setSavedBooksView();
        }
        if (e.target.id === 'toRead') {
          setSavedBooksView();
        }
      }

      if (e.target.className === 'indBookCntr') {
        this.setState({ savedBooksView: false });
        this.setState({ searchView: false });
        this.setState({ indBookViewOn: true });
      }
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
              <BiSearchAlt className='searchBtn' onClick={searchBooks}/>
            </div>
          :  <BiSearchAlt className='searchBtnCls' onClick={handleSearchbar}/> }
         
        </div>

        <div className={'sidebar ' + this.state.sidebarStatus }>
          <AiOutlineClose className='sidebarBtnOpen' onClick={handleSidebar}/>

          <div className='categoriesCntr'>
            <p className='category' id='searchBook' onClick={onClick}>Search Book</p>
            <p className='category' id='savedBooks' onClick={onClick}>Saved Books</p>
            <p className='category' id='general' onClick={onClick}>General</p>
            <p className='category' id='favorites' onClick={onClick}>Favorites</p>
            <p className='category' id='toRead' onClick={onClick}>To Read</p>
          </div>
        </div>
        
        
        { this.state.searchView ? <SearchRsltBooks onClick={onClick} /> : null }
        { this.state.savedBooksView ?  <SavedBooks onClick={onClick}/> : null }
        { this.state.indBookViewOn ? <IndBookView onClick={onClick}/> : null }
        {/* <SavedBooks onClick={onClick}/> */}
      
      </div>
    );
  }
}

export default App;
