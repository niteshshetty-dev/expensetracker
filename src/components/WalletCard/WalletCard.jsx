export default function WalletCard({ total }) {
  return (
    <div className="card wallet-card">
      <h2 className="cardTitle">
        Wallet Balance: <span className="success">{total}</span>
      </h2>
      <button type="button" className="btn btn-green shadow">
        + Add Income
      </button>
    </div>
  );
}
