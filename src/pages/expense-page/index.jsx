//LIBRARIES
import { useState, createContext } from "react";

//DOM COMPONENTS AND STYLE
import "./styles.css";
import { AddTransactionForm } from "../../components/AddTransactionForm";
import { BalanceSummary } from "../../components/BalanceSummary";
import { UpdateTransactionForm } from "../../components/UpdateTransactionForm";
import { TransactionList } from "../../components/TransactionList";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useNavigate } from "react-router-dom";
import { transactionTemplate } from "../../config/firebase-config";

//CONTEXT FOR UPDATING ENTRIES
export const ExpensePageContext = createContext();

//MAIN PAGE
export const ExpensePage = () => {
  const { isAuth } = useGetUserInfo();
  const navigate = useNavigate();
  const [updateTransactionInput, setUpdateTransactionInput] = useState(transactionTemplate);

  if (!isAuth)
    return (
      <div>
        No se ha iniciado sesión<button onClick={() => navigate("/")}>Iniciar sesión</button>
      </div>
    );

  return (
    <ExpensePageContext.Provider value={{ updateTransactionInput, setUpdateTransactionInput }}>
      <UpdateTransactionForm /> {/*uses { updateTransactionInput, setUpdateTransactionInput }*/}
      <AddTransactionForm />
      <TransactionList />
      <BalanceSummary />
    </ExpensePageContext.Provider>
  );
};
