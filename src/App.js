import React, { Component } from 'react';
import Axios from 'axios';
import { AiOutlineMenu } from 'react-icons/ai'
import { AiOutlineClose } from 'react-icons/ai'
import { BiSearchAlt } from 'react-icons/bi'
import IndBookView from './components/IndBookView';
import IndBookViewSB from './components/IndBookViewSB';
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
    
    const onChange = (e) => {
      console.log(e.target)

      if (e.target.className === 'searchbar') { this.setState({ searchInput: e.target.value }); };

      if (e.target.className === 'addComment') { this.setState({ addCommentInput: e.target.value }); };

      if (e.target.className === 'cllctnBook') { this.setState({ cllctnBookInput: e.target.value }); };
    }

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

    const searchBooks = async () => {
      let items, updatedList = [];
      await Axios.get(`https://www.googleapis.com/books/v1/volumes?q=harry+potter`).then(data => items = data.data.items );

      for (let i = 0; i < items.length; i++) {
        const object = { thumbnail: items[i].volumeInfo.imageLinks.thumbnail, title: items[i].volumeInfo.title, author: items[i].volumeInfo.authors, publishDate: items[i].volumeInfo.publishedDate, category: items[i].volumeInfo.categories, description: items[i].volumeInfo.description, comments: [''], savedGroup: ''};

        updatedList.push(object)
      }

      this.setState({ resultBooks: updatedList });
      // console.log(updatedList)

      if (this.state.indBookViewOn) {this.setState({ searchOn: !this.state.searchOn });}
      this.setState({ indBookViewOn: false });
      this.setState({ savedBooksView: false });
      this.setState({ searchView: true });
    }

    const setSavedBooksView = () => {
      this.setState({ indBookViewOn: false });
      this.setState({ searchView: false });
      this.setState({ savedBooksView: true });
    };

    const onClick = async (e) => {
      console.log(e.target.className)

      if (e.target.className === 'category') {
        this.setState({ sidebarStatus: '' });
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
    
    
    console.log(this.state.resultBooks)

    return (
      <div className="container">

        <div className='nav-barCntr'>
          <AiOutlineMenu className='sidebarBtn' onClick={handleSidebar}/>
          
          { this.state.indBookViewOn ? <IndBookViewSB onClick={onClick} onChange={onChange} searchOn={this.state.searchOn} handleSearchbar={handleSearchbar} searchBooks={searchBooks}/> : null}

         { this.state.searchView || this.state.savedBooksView ? 
            <div className='searchbarCntr'>
              <input className='searchbar' placeholder={ this.state.searchView ? "Search Book..." : this.state.savedBooksView ? 'Search Saved Book...' : null} onChange={onChange}></input>
              <BiSearchAlt className='searchBtn' onClick={searchBooks}/>
            </div>
          : null }
       

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
        { this.state.indBookViewOn ? <IndBookView onClick={onClick} onChange={onChange}/> : null }
      
      </div>
    );
  }
}

export default App;
