import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {table: []}

  componentDidMount() {
    fetch('/table')
      .then(res => res.json())
      .then(table => this.setState({ table }));
  }

  render() {
    return (
      <div className="App">
        {this.state.table.map(thing => 
          <div key={thing.id}>{thing.stuff}</div>
          )}
      </div>
    );
  }
}

export default App;
