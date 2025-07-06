import React, { useState } from 'react';

const checkWinner = (b: string[]) => {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (const [a,b1,c] of lines) if (b[a] && b[a] === b[b1] && b[a] === b[c]) return b[a];
  return b.every(x => x) ? 'Draw' : null;
};

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = checkWinner(board);
  const play = (i: number) => {
    if (board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };
  const reset = () => {
    setBoard(Array(9).fill(''));
    setXIsNext(true);
  };
  return (
    <div className="llm-container" style={{ minWidth: 300 }}>
      <div className="llm-title">Tic Tac Toe</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 40px)', gap: 4, margin: 'auto' }}>
        {board.map((cell, i) => (
          <div key={i} onClick={() => play(i)} style={{ width: 40, height: 40, background: '#fff', border: '1px solid #333', fontSize: 24, textAlign: 'center', lineHeight: '40px', cursor: 'pointer' }}>{cell}</div>
        ))}
      </div>
      <div className="llm-text" style={{ marginTop: 16 }}>{winner ? (winner === 'Draw' ? 'Draw!' : `Winner: ${winner}`) : `Next: ${xIsNext ? 'X' : 'O'}`}</div>
      <button className="llm-button" onClick={reset} style={{ marginTop: 8 }}>Reset</button>
    </div>
  );
};

export default TicTacToe; 