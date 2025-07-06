'use client';

import React, { useState } from 'react';

function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

export default function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(''));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);

  function handleClick(i: number) {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function handleReset() {
    setSquares(Array(9).fill(''));
    setXIsNext(true);
  }

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (squares.every(Boolean)) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center', marginTop: 40 }}>
      <h1>Tic Tac Toe</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 60px)',
        gap: 5,
        justifyContent: 'center',
        margin: '20px auto'
      }}>
        {squares.map((value, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            style={{
              width: 60,
              height: 60,
              fontSize: 24,
              cursor: 'pointer'
            }}
          >
            {value}
          </button>
        ))}
      </div>
      <div style={{ margin: 10, fontSize: 18 }}>{status}</div>
      <button onClick={handleReset} style={{ marginTop: 10, padding: '8px 16px' }}>
        Restart
      </button>
    </div>
  );
}