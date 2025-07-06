import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'expense-tracker';

type Expense = { desc: string; amount: number };

const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setExpenses(JSON.parse(stored));
  }, []);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const add = () => {
    if (desc && amount > 0) {
      setExpenses([{ desc, amount }, ...expenses]);
      setDesc(''); setAmount(0);
    }
  };
  const del = (idx: number) => setExpenses(expenses.filter((_, i) => i !== idx));
  const total = expenses.reduce((a, b) => a + b.amount, 0);

  return (
    <div className="llm-container" style={{ minWidth: 320 }}>
      <div className="llm-title">Expense Tracker</div>
      <div className="llm-row">
        <input className="llm-input" value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" />
        <input className="llm-input" type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} placeholder="Amount" />
        <button className="llm-button" onClick={add}>Add</button>
      </div>
      <div style={{ marginTop: 16 }}>
        {expenses.length === 0 && <div className="llm-text">No expenses.</div>}
        {expenses.map((e, idx) => (
          <div key={idx} className="llm-row" style={{ marginBottom: 8 }}>
            <div className="llm-text" style={{ flex: 1 }}>{e.desc}: {e.amount}</div>
            <button className="llm-button bg-red-500 hover:bg-red-600" onClick={() => del(idx)}>Delete</button>
          </div>
        ))}
      </div>
      <div className="llm-text" style={{ marginTop: 16 }}>Total: {total}</div>
    </div>
  );
};

export default ExpenseTracker; 