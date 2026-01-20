export default function ExpenseCard({ expense, onAdd }) {
  return (
    <div className="card esxpense-card">
      <h2 className="cardTitle">
        Expenses: <span className="failure">{expense}</span>
      </h2>
      <button type="button" className="btn btn-red shadow" onClick={onAdd}>
        + Add Expense
      </button>
    </div>
  );
}
