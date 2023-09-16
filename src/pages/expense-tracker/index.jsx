//LIBRARIES
import { useState, createContext } from "react";

//DOM COMPONENTS AND STYLE
import "./styles.css";
import { AddTransactionForm } from "../../components/AddTransactionForm";
import { BalanceSummary } from "../../components/BalanceSummary";
import { UpdateTransactionForm } from "../../components/UpdateTransactionForm";
import { TransactionList } from "../../components/TransactionList";
import { ProfileTab } from "../../components/ProfileTab";

//CONTEXT FOR UPDATING ENTRIES
export const MainPageContext = createContext();

//MAIN PAGE
export const ExpenseTracker = () => {
  const [addUpdateInput, setAddUpdateInput] = useState({
    description: "",
    transactionAmount: "",
    transactionType: "expense",
  });

  return (
    <MainPageContext.Provider value={{ addUpdateInput, setAddUpdateInput }}>
      <UpdateTransactionForm /> {/*uses { addUpdateInput, setAddUpdateInput }*/}
      <ProfileTab />
      <BalanceSummary />
      <AddTransactionForm />
      <TransactionList />
    </MainPageContext.Provider>
  );
};
