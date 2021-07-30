import React from 'react';
import './App.css';
import SnakeGame from './snake/SnakeGame';

function App() {
  return (
    <div className="App">
        <h1>Snake Game</h1>
        <SnakeGame gridSize={15}/>
    </div>
  );
}

export default App;
