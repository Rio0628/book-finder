import React, { Component } from 'react';
import Axios from 'axios';
import api from './api';
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
      previewOn: true,
      sidebarOn: false,
      searchOn: false,
      searchView: false,
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

    // api.getAllBooks().then(books => console.log(books.data.data))

    const searchBooks = async () => {
      let items, updatedList = [];
      await Axios.get(`https://www.googleapis.com/books/v1/volumes?q=harry+potter`).then(data => items = data.data.items );

      for (let i = 0; i < items.length; i++) {
        const object = { thumbnail: items[i].volumeInfo.imageLinks.thumbnail, title: items[i].volumeInfo.title, author: items[i].volumeInfo.authors, publishDate: items[i].volumeInfo.publishedDate, category: items[i].volumeInfo.categories, description: items[i].volumeInfo.description, comments: [], savedGroup: ''};

        updatedList.push(object)
      }

      this.setState({ currentBooks: updatedList });
      // console.log(updatedList)

      if (this.state.indBookViewOn) {this.setState({ searchOn: !this.state.searchOn });}
      this.setState({ previewOn: false });
      this.setState({ indBookViewOn: false });
      this.setState({ savedBooksView: false });
      this.setState({ searchView: true });
    }

    const setSavedBooksView = () => {
      this.setState({ previewOn: false });
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
          this.setState({ previewOn: true });
        }
        if (e.target.id === 'savedBooks') {
          let books;
          await api.getAllBooks().then(books => books = books.data.data )
          console.log(books)
          console.log('mario')
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

      if (e.target.className === 'savedBkBtn') {
        let books;
        await api.getAllBooks().then(allbooks => books = allbooks.data.data)
        this.setState({ currentBooks: books});
        setSavedBooksView();
      }

      if (e.target.id === 'indBookSaved') {
        await api.getBookById(e.target.getAttribute('book')).then(book => this.setState({ selectedBook: book.data.data }) )

        this.setState({ previewOn: false });
        this.setState({ savedBooksView: false });
        this.setState({ searchView: false });
        this.setState({ indBookViewOn: true });
      }

      if (e.target.id === 'indBookSearch') {
        console.log(e.target.getAttribute('book'))
        this.setState({ selectedBook: this.state.currentBooks[e.target.getAttribute('book')] });

        this.setState({ previewOn: false });
        this.setState({ savedBooksView: false });
        this.setState({ searchView: false });
        this.setState({ indBookViewOn: true });
      }
    } 
    
    
    // console.log(this.state.currentBooks)
    console.log(this.state.selectedBook)

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

          { this.state.previewOn ? 
            <div className='searchbarCntr'>
              <input className='searchbar' placeholder="Search Book..." onChange={onChange}></input>
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
        
        { this.state.previewOn ? <p className='previewMsg'>Search book or view <span className='savedBkBtn' onClick={onClick}>Saved Books</span></p> : null }
        { this.state.searchView ? <SearchRsltBooks searchInput={this.state.searchInput} resultBooks={this.state.currentBooks} onClick={onClick} /> : null }
        { this.state.savedBooksView ?  <SavedBooks currentBooks={this.state.currentBooks} onClick={onClick}/> : null }
        { this.state.indBookViewOn ? <IndBookView book={this.state.selectedBook} onClick={onClick} onChange={onChange}/> : null }
      
      </div>
    );
  }
}

export default App;
