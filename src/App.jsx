import Header from "./components/Header/Header";
import "./App.css";
import WalletCard from "./components/WalletCard/WalletCard";
import ExpenseCard from "./components/ExpenseCard/Expense";
import SummaryChart from "./components/SummaryChart/SummaryChart";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import TrendChart from "./components/TrendChart/TrendChart";
export default function App() {
  return (
    <div className="expense-tracker">
      <Header />
      <div className="expense-tracker-body">
        <div className="summary-section">
          <div className="cards">
            <WalletCard />
            <ExpenseCard />
          </div>
          <SummaryChart />
        </div>
        <div className="content-section">
          <ExpenseList />
          <TrendChart />
        </div>
      </div>
    </div>
  );
}
