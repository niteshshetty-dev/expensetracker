export default function Expense({ total, onAdd }) {
  return (
    <div className="card">
      <h2>
        Expenses: <span className="expense-amount">₹{total}</span>
      </h2>
      <button type="button" className="button red" onClick={onAdd}>
        + Add Expense
      </button>
    </div>
  );
}
