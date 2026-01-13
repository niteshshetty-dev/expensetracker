import Modal from "react-modal";
import { useState } from "react";
import "./IncomeModal.css";
export default function IncomeModal({ open, onClose, onSubmit }) {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(Number(amount));
    setAmount("");
    onClose();
  };

  return (
    <Modal
      isOpen={open}
      ariaHideApp={false}
      className="income-modal"
      overlayClassName="modal-overlay"
    >
      <h3>Add Balance</h3>

      <form onSubmit={handleSubmit} className="income-form">
        <input
          type="number"
          placeholder="Income Amount"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <div className="modal-actions">
          <button type="submit" className="btn-primary">
            Add Balance
          </button>

          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
