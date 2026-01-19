export default function ExpenseCard({ expense }) {
  return (
    <div className="card esxpense-card">
      <h2 className="cardTitle">
        Expenses: <span className="failure">{expense}</span>
      </h2>
      <button type="button" className="btn btn-red shadow">
        + Add Expense
      </button>
    </div>
  );
}
