import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Autocomplete from './Autocomplete';

function App() {
  return (
    <div className="App">
    <Autocomplete
      suggestions={['White', 'Black', 'Green', 'Blue', 'Yellow', 'Red']}
    />
  </div>
  );
}

export default App;
