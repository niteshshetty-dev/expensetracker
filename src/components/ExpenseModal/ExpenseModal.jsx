import Modal from "react-modal";
import "./ExpenseModal.css";

export default function ExpenseModal({ open, onClose, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const success = onSubmit({
      id: Date.now(),
      title: form.title.value,
      price: Number(form.price.value),
      category: form.category.value,
      date: form.date.value,
    });

    if (success) {
      form.reset();
      onClose();
    }
  };

  return (
    <Modal
      isOpen={open}
      ariaHideApp={false}
      className="expense-modal"
      overlayClassName="modal-overlay"
    >
      <h3>Add Expenses</h3>

      <form onSubmit={handleSubmit} className="expense-form">
        <input name="title" placeholder="Title" required />
        <input name="price" type="number" placeholder="Price" required />

        <select name="category" required>
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Travel">Travel</option>
        </select>

        <input name="date" type="date" placeholder="dd/mm/yyyy" required />

        <button type="submit" className="btn-primary">
          Add Expense
        </button>

        <button type="button" className="btn-cancel" onClick={onClose}>
          Cancel
        </button>
      </form>
    </Modal>
  );
}
