import React, { useState, useEffect } from 'react';

const ExpenseTracker = () => {
  const [todos, setTodos] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  const addTodo = () => {
    if (description.trim() !== '' && amount.trim() !== '' && category.trim() !== '' && type.trim() !== '') {
      let mytask = [...todos, { description, amount, category, type }];
      setTodos(mytask);
      localStorage.setItem('todos', JSON.stringify(mytask));
      setDescription('');
      setAmount('');
      setCategory('');
      setType('');
    }
  };

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const handleRemoveTodo = () => {
    setTodos([]);
    localStorage.removeItem('todos');
  };

  const totalDebit = todos.filter(todo => todo.type === 'debit').reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
  const totalCredit = todos.filter(todo => todo.type === 'credit').reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
  const balance = totalCredit - totalDebit;

  return (
    <div className="Expense_tracker">
      <div className="leftBox">
        <div className="form-container">
          <div className="add-details">
            <h3>Give Your Details Here</h3>
          </div>
          <div className="input_box">
            <p>
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </p>
            <p>
              <label htmlFor="amount">Amount:</label>
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </p>
            <p>
              <label htmlFor="category">Category:</label>
              <input
                type="text"
                placeholder="Write category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </p>
            <p>
              <label htmlFor="type">Type:</label>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">Select Type</option>
                <option value="debit">Debit</option>
                <option value="credit">Credit</option>
              </select>
            </p>
          </div>
        </div>
        <div className="button_box">
          <button onClick={addTodo}>Add</button>
          <button onClick={handleRemoveTodo}>Reset</button>
        </div>
      </div>
      <div className="rightBox">
        <div className="details-container">
          <div className="details_header">
            <h3>Details</h3>
          </div>
          <div className="column">
            <div className="debit-column">
              <h4>Debit</h4>
              {todos
                .filter(todo => todo.type === 'debit')
                .map((todo, index) => (
                  <div key={index} className="detail-item debit-item">
                    <div className="item-list">
                      <p>{todo.description}</p>
                      <p>{todo.amount}</p>
                      <p>{todo.category}</p>
                    </div>
                    <div className="remove">
                    <button onClick={() => removeTodo(index)}>Delete</button>
                    </div>
                  </div>
                ))}
            </div>
            <div className="credit-column">
              <h4>Credit</h4>
              {todos
                .filter(todo => todo.type === 'credit')
                .map((todo, index) => (
                  <div key={index} className="detail-item credit-item">
                    <div className="item-list">
                      <p>{todo.description}</p>
                      <p>{todo.amount}</p>
                      <p>{todo.category}</p>
                    </div>
                    <div className="remove">
                    <button onClick={() => removeTodo(index)}>Delete</button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="totals-container">
          <div className="totals">
           <div className="balance">Balance: ${balance.toFixed(2)}</div>
            <div className="total-debit">Total Debit: ${totalDebit.toFixed(2)}</div>
            <div className="total-credit">Total Credit: ${totalCredit.toFixed(2)}</div> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
