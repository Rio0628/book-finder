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
      isSaved: false,
      indBookViewOn: false,  
      cllctnBookInput: 'General',    
    }
  }
  
  render () {
    
    const onChange = (e) => {
      // Handles getting the values of the input elements and stores the value within their respective states 
      if (e.target.className === 'searchbar') { this.setState({ searchInput: e.target.value }); };
      if (e.target.className === 'addComment') { this.setState({ addCommentInput: e.target.value }); };
      if (e.target.className === 'cllctnBook') { this.setState({ cllctnBookInput: e.target.value }); };
    }

    const handleSidebar = async () => {
      // Handles bringing the sidebar into view in both viewport changes 
      await this.setState({ sidebarOn: !this.state.sidebarOn })

      if (this.state.sidebarOn === true ) {
        this.setState({ sidebarStatus: 'active'});
      }
      else { this.setState({ sidebarStatus: '' } )};
    }

    const handleSearchbar = () => {
      // Handles bringing the searchbar into view 
      this.setState({ searchOn: !this.state.searchOn });
    }

    const getFltrdBooks = async (group, books) => {
      // Function to filter the saved books by the group being viewed
      if (group === 'General' && books.length > 0) {
        books = books.filter( book => book.savedGroup === "General");
      }
      
      if (group === 'Favorite' && books.length > 0) {
        books = books.filter( book => book.savedGroup === "Favorite");
      }
      
      if (group === 'To Read' && books.length > 0) {
        books = books.filter( book => book.savedGroup === "To Read");
      }

      this.setState({ currentBooks: books });
    }

    const searchBooks = async () => {
      // Main function to search books from the API and individual objects with only the necessary information from each book 
      let items, updatedList = [];
      await Axios.get(`https://www.googleapis.com/books/v1/volumes?q=harry+potter`).then(data => items = data.data.items );

      for (let i = 0; i < items.length; i++) {
        const object = { thumbnail: items[i].volumeInfo.imageLinks.thumbnail, title: items[i].volumeInfo.title, author: items[i].volumeInfo.authors, publishDate: items[i].volumeInfo.publishedDate, category: items[i].volumeInfo.categories, description: items[i].volumeInfo.description, comments: [], savedGroup: ''};

        updatedList.push(object)
      }

      this.setState({ currentBooks: updatedList });

      if (this.state.indBookViewOn) {this.setState({ searchOn: !this.state.searchOn });}
      this.setState({ previewOn: false });
      this.setState({ indBookViewOn: false });
      this.setState({ savedBooksView: false });
      this.setState({ searchView: true });
    }

    const setSavedBooksView = () => {
      // Function to bring the saved book view 
      this.setState({ previewOn: false });
      this.setState({ indBookViewOn: false });
      this.setState({ searchView: false });
      this.setState({ savedBooksView: true });
    };

    const onClick = async (e) => {
      // Main onClick function for application

      if (e.target.className === 'category') {
        // Main Function to change between different components or view within the application 
        this.setState({ sidebarStatus: '' });

        // Code to search REST API for books and differenciate by with group is being viewed
        if (e.target.id === 'searchBook') {
          this.setState({ indBookViewOn: false });
          this.setState({ savedBooksView: false });
          this.setState({ previewOn: true });
        }
        if (e.target.id === 'savedBooks') {
          let books;
          await api.getAllBooks().then(allbooks => books = allbooks.data.data ).catch(err => alert('No Books Saved'), books = '' ) 
          await getFltrdBooks('', books);
          this.setState({ currentBooks: books })
          this.setState({ currentSavedGroup: '' });

          setSavedBooksView();  
        }
        if (e.target.id === 'general') {
          let books;
          await api.getAllBooks().then(allbooks => books = allbooks.data.data ).catch(err => alert('No Books Saved'), books = '' )

          await getFltrdBooks('General', books);
          this.setState({ currentSavedGroup: 'General' });  
          
          setSavedBooksView();
        }

        if (e.target.id === 'favorite') {
          let books;
          await api.getAllBooks().then(allbooks => books = allbooks.data.data ).catch(err => alert('No Books Saved'), books = '' )

          if (!this.state.emptySavedBooks) {await getFltrdBooks('Favorite', books);}
          this.setState({ currentSavedGroup: 'Favorite' }); 

          setSavedBooksView();
        }
        if (e.target.id === 'toRead') {
          let books;
          await api.getAllBooks().then(allbooks => books = allbooks.data.data ).catch(err => alert('No Books Saved'), books = '' )

          await getFltrdBooks('To Read', books);
          this.setState({ currentSavedGroup: 'To Read' });  

          setSavedBooksView();  
        }
      }

      // Function to save book within database 
      if (e.target.id === 'saveBtn') {
        const book = this.state.selectedBook;
        book.savedGroup = this.state.cllctnBookInput;
        console.log(book)
        await api.insertBook(book).then( book => alert('Book Saved!') );

        this.setState({ isSaved: true });
      }

      // Function to remove a book from the database 
      if (e.target.className === 'removeBtn') {
        const book = e.target.getAttribute('book');
        await api.deleteBookById(book).then(book => alert('Book Removed'));

        let books;
        await api.getAllBooks().then(allbooks => books = allbooks.data.data )
        await getFltrdBooks(this.state.currentSavedGroup, books);
      }

      // Function to bring up the saved books view 
      if (e.target.className === 'savedBkBtn') {
        let books;
        await api.getAllBooks().then(allbooks => books = allbooks.data.data ).catch(err => alert("No Books Saved"));
        this.setState({ currentBooks: books});
        setSavedBooksView();
      }

      // Function to view individual saved book 
      if (e.target.id === 'indBookSaved') {
        await api.getBookById(e.target.getAttribute('book')).then(book => this.setState({ selectedBook: book.data.data }) )
        
        this.setState({ isSaved: true });

        this.setState({ previewOn: false });
        this.setState({ savedBooksView: false });
        this.setState({ searchView: false });
        this.setState({ indBookViewOn: true });
      }

      // Function to view individual search book 
      if (e.target.id === 'indBookSearch') {
        const book = this.state.currentBooks[e.target.getAttribute('book')];
        
        let books;
        await api.getAllBooks().then(allBooks => books = allBooks.data.data).catch(err => console.log('No previous saved books'), books = '' )
        
        // Shows the user if the book has already been saved or not 
          const finalBook = books.filter(Book => Book.author[0] === book.author[0] && Book.title === book.title && Book.publishDate === book.publishDate);

        if (finalBook[0]) { 
          this.setState({ isSaved: true });
          this.setState({ cllctnBookInput: finalBook[0].savedGroup });
          book.savedGroup = finalBook[0].savedGroup;
        }
        else {
          this.setState({ isSaved: false });
          this.setState({ cllctnBookInput: 'General'});
        }

        this.setState({ selectedBook: book });

        this.setState({ previewOn: false });
        this.setState({ savedBooksView: false });
        this.setState({ searchView: false });
        this.setState({ indBookViewOn: true });
      }

      // Function to add new comment to book 
      if (e.target.className === 'addBtn') {
        const book = this.state.selectedBook;

        if (this.state.isSaved) {
          const bookId = e.target.getAttribute('book')

          book.comments.push(this.state.addCommentInput);
          this.setState({ selectedBook: book })

          await api.updateBookById(bookId, book).then(book => console.log('book updated'))
        } 
        else {
          book.savedGroup = 'General';
          book.comments.push(this.state.addCommentInput);
          this.setState({ selectedBook: book });
          await api.insertBook(book).then( book => alert('Book Saved!') );
          this.setState({ isSaved: true });
        }
      }

      // Function to remove comment from book 
      if (e.target.className === 'removeCmmntBtn') {
        const book = this.state.selectedBook, bookId = e.target.getAttribute('book');

        book.comments = book.comments.filter( comment => comment !== e.target.getAttribute('comment') )

        await api.updateBookById(bookId, book).then(book => console.log('book updated'))
        this.setState({ selectedBook: book })
      }

    } 

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
            <p className='category' id='favorite' onClick={onClick}>Favorites</p>
            <p className='category' id='toRead' onClick={onClick}>To Read</p>
          </div>
        </div>
        
        { this.state.previewOn ? <p className='previewMsg'>Search book or view <span className='savedBkBtn' onClick={onClick}>Saved Books</span></p> : null }
        { this.state.searchView ? <SearchRsltBooks searchInput={this.state.searchInput} resultBooks={this.state.currentBooks} onClick={onClick} /> : null }
        { this.state.savedBooksView ?  <SavedBooks currentSavedGroup={this.state.currentSavedGroup} currentBooks={this.state.currentBooks} onClick={onClick}/> : null }
        { this.state.indBookViewOn ? <IndBookView isSaved={this.state.isSaved} book={this.state.selectedBook} onClick={onClick} onChange={onChange}/> : null }
      
      </div>
    );
  }
}

export default App;
