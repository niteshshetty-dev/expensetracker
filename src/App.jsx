import Header from "./components/Header/Header";
import "./App.css";
import WalletCard from "./components/WalletCard/WalletCard";
import ExpenseCard from "./components/ExpenseCard/ExpenseCard";
import SummaryChart from "./components/SummaryChart/SummaryChart";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import { useEffect, useState } from "react";
import ModalContainer from "./components/Modal/ModalContainer";
import IncomeModal from "./components/IncomeModal/IncomeModal";
import ExpenseModal from "./components/ExpenseModal/ExpenseModal";
import TrendChart from "./components/TrendChart/TrendChart";

export default function App() {
  const [balance, setBalance] = useState(0);
  const [expense, setExpense] = useState(0);
  const [expenseList, setExpenseList] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  const [categorySpends, setCategorySpends] = useState({
    food: 0,
    entertainment: 0,
    travel: 0,
  });
  const [categoryCount, setCategoryCount] = useState({
    food: 0,
    entertainment: 0,
    travel: 0,
  });

  useEffect(() => {
    const localBalance = localStorage.getItem("balance");
    if (localBalance) {
      setBalance(Number(localBalance));
    } else {
      localStorage.setItem("balance", 5000);
      setBalance(5000);
    }
    const items = JSON.parse(localStorage.getItem("expenses"));
    setExpenseList(items || []);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (expenseList.length > 0 || isMounted) {
      localStorage.setItem("expenses", JSON.stringify(expenseList));
    }

    if (expenseList.length > 0) {
      setExpense(
        expenseList.reduce(
          (accumulator, currentValue) =>
            accumulator + Number(currentValue.price),
          0,
        ),
      );
    } else {
      setExpense(0);
    }

    let foodSpends = 0,
      entertainmentSpends = 0,
      travelSpends = 0;
    let foodCount = 0,
      entertainmentCount = 0,
      travelCount = 0;

    expenseList.forEach((item) => {
      if (item.category == "food") {
        foodSpends += Number(item.price);
        foodCount++;
      } else if (item.category == "entertainment") {
        entertainmentSpends += Number(item.price);
        entertainmentCount++;
      } else if (item.category == "travel") {
        travelSpends += Number(item.price);
        travelCount++;
      }
    });

    setCategorySpends({
      food: foodSpends,
      travel: travelSpends,
      entertainment: entertainmentSpends,
    });

    setCategoryCount({
      food: foodCount,
      travel: travelCount,
      entertainment: entertainmentCount,
    });
  }, [expenseList]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("balance", balance);
    }
  }, [balance]);

  return (
    <div className="expense-tracker">
      <Header />
      <div className="summary-section">
        <WalletCard total={balance} onAdd={() => setIsIncomeModalOpen(true)} />
        <ExpenseCard
          expense={expense}
          onAdd={() => setIsExpenseModalOpen(true)}
        />
        <SummaryChart
          data={[
            { name: "Food", value: categorySpends.food },
            { name: "Travel", value: categorySpends.travel },
            { name: "Entertainment", value: categorySpends.entertainment },
          ]}
        />
      </div>

      <div className="content-section">
        <ExpenseList
          transactions={expenseList}
          editTransactions={setExpenseList}
          title="Recent Transactions"
          balance={balance}
          setBalance={setBalance}
        />
        <TrendChart
          data={[
            { name: "Food", value: categoryCount.food },
            { name: "Travel", value: categoryCount.travel },
            { name: "Entertainment", value: categoryCount.entertainment },
          ]}
        />
      </div>
      <ModalContainer
        isOpen={isIncomeModalOpen}
        handleClose={() => setIsIncomeModalOpen(false)}
      >
        <IncomeModal setBalance={setBalance} setIsOpen={setIsIncomeModalOpen} />
      </ModalContainer>
      <ModalContainer
        isOpen={isExpenseModalOpen}
        handleClose={() => setIsExpenseModalOpen(false)}
      >
        <ExpenseModal
          setIsOpen={setIsExpenseModalOpen}
          setBalance={setBalance}
          expenseList={expenseList}
          setExpenseList={setExpenseList}
          balance={balance}
          editId={false}
        />
      </ModalContainer>
    </div>
  );
}
