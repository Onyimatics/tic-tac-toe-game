import React, { Component } from 'react';
import './App.css';
import Board from '../Board/Board'

class App extends Component {
  render() {
    return (
      <div className="App">
        <body className="container">
          <h2>Tic Tac Toe</h2>
          <Board></Board>
        </body>
      </div>
    );
  }
}

export default App;