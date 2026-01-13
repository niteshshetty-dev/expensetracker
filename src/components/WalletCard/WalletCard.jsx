export default function Wallet({ balance, onAdd }) {
  return (
    <div className="card wallet-card">
      <h2>
        Wallet Balance: <span className="balance-amount">₹{balance}</span>
      </h2>
      <button type="button" className="button green" onClick={onAdd}>
        + Add Income
      </button>
    </div>
  );
}
