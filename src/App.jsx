import { useState } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
import Wallet from "./components/WalletCard/WalletCard";
import Expense from "./components/ExpenseCard/Expense";
import IncomeModal from "./components/IncomeModal/IncomeModal";
import ExpenseModal from "./components/ExpenseModal/ExpenseModal";
import "./App.css";

function App() {
  const { enqueueSnackbar } = useSnackbar();

  const [balance, setBalance] = useState(5000);
  const [expenses, setExpenses] = useState([]);
  const [showIncome, setShowIncome] = useState(false);
  const [showExpense, setShowExpense] = useState(false);

  const addIncome = (amount) => {
    setBalance((prev) => prev + amount);
  };

  const addExpense = (data) => {
    if (data.price > balance) {
      enqueueSnackbar("Insufficient balance", { variant: "error" });
      return false;
    }
    setExpenses((prev) => [...prev, data]);
    setBalance((prev) => prev - data.price);
    return true;
  };

  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <h1>Expense Tracker</h1>
        <div className="cards">
          <div className="card-container">
            <Wallet balance={balance} onAdd={() => setShowIncome(true)} />
            <Expense
              total={expenses.reduce((s, e) => s + e.price, 0)}
              onAdd={() => setShowExpense(true)}
            />
          </div>
        </div>

        <IncomeModal
          open={showIncome}
          onClose={() => setShowIncome(false)}
          onSubmit={addIncome}
        />

        <ExpenseModal
          open={showExpense}
          onClose={() => setShowExpense(false)}
          onSubmit={addExpense}
        />
      </SnackbarProvider>
    </>
  );
}
