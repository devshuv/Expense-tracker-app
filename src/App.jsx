import React from 'react';
import ExpenseTracker from './components/ExpenseTracker';
import './components/ExpenseTracker.css'

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="heading"><h1>Expense Tracker </h1></div>
        <ExpenseTracker />
      </header>
    </div>
  );
}

export default App;