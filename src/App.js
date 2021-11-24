import React, { Component } from 'react';
import Axios from 'axios';

class App extends Component {
  render () {
    
    Axios.get(`https://www.googleapis.com/books/v1/volumes?q=harry+potter`).then(data => console.log(data) );

    return (
      <div className="container">
        <h1>Hello</h1>
      </div>
    );
  }
}

export default App;
