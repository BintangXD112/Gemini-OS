import React, { useState } from 'react';

const initial = [
  ['r','n','b','q','k','b','n','r'],
  ['p','p','p','p','p','p','p','p'],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['P','P','P','P','P','P','P','P'],
  ['R','N','B','Q','K','B','N','R'],
];

const ChessBoard: React.FC = () => {
  const [board, setBoard] = useState(initial);
  const [selected, setSelected] = useState<[number, number] | null>(null);

  const select = (r: number, c: number) => {
    if (selected) {
      const newBoard = board.map(row => [...row]);
      newBoard[r][c] = board[selected[0]][selected[1]];
      newBoard[selected[0]][selected[1]] = '';
      setBoard(newBoard);
      setSelected(null);
    } else if (board[r][c]) {
      setSelected([r, c]);
    }
  };

  return (
    <div className="llm-container" style={{ minWidth: 340 }}>
      <div className="llm-title">Chess Board</div>
      <table style={{ borderCollapse: 'collapse', margin: 'auto' }}>
        <tbody>
          {board.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) => (
                <td
                  key={c}
                  onClick={() => select(r, c)}
                  style={{
                    width: 40,
                    height: 40,
                    background: (r + c) % 2 === 0 ? '#fff' : '#888',
                    border: selected && selected[0] === r && selected[1] === c ? '2px solid red' : '1px solid #333',
                    textAlign: 'center',
                    fontSize: 24,
                    cursor: 'pointer',
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChessBoard; 