import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";

import { useModifyTransaction } from "../../hooks/useModifyTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";

import "./styles.css";
import { AddTransactionForm } from "../../components/AddTransactionForm";

export const MainPageContext = createContext();

export const ExpenseTracker = () => {
  const { addTransaction, deleteTransaction, updateTransaction } = useModifyTransaction();
  const { transactions, transactionTotals } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();

  const emptyForm = {
    description: "",
    transactionAmount: "",
    transactionType: "expense",
  };
  const { balance, income, expenses } = transactionTotals;

  const [addTransactionInput, setAddTransactionInput] = useState(emptyForm);
  const [addUpdateInput, setAddUpdateInput] = useState(emptyForm);

  const onUpdate = (e) => {
    e.preventDefault();
    updateTransaction(addUpdateInput);
    setAddUpdateInput(emptyForm);
    document.getElementById("updateTransactionPopup").close();
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MainPageContext.Provider value={{ addTransactionInput, setAddTransactionInput, addTransaction }}>
      <dialog id="updateTransactionPopup">
        Edit transaction
        <form onSubmit={onUpdate}>
          <button onClick={() => document.getElementById("updateTransactionPopup").close()}>Cancel</button>
          <button type="submit">Save changes</button>
          <input
            type="text"
            placeholder="Descripción"
            value={addUpdateInput.description}
            required
            onChange={(e) => setAddUpdateInput({ ...addUpdateInput, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Cantidad"
            value={addUpdateInput.transactionAmount}
            required
            onChange={(e) => setAddUpdateInput({ ...addUpdateInput, transactionAmount: e.target.value })}
          />
          <input
            type="radio"
            id="expense"
            value="expense"
            checked={addUpdateInput.transactionType === "expense"}
            onChange={(e) => setAddUpdateInput({ ...addUpdateInput, transactionType: e.target.value })}
          />
          <label htmlFor="expense">Gasto</label>
          <input
            type="radio"
            id="income"
            value="income"
            checked={addUpdateInput.transactionType === "income"}
            onChange={(e) => setAddUpdateInput({ ...addUpdateInput, transactionType: e.target.value })}
          />
          <label htmlFor="income">Ingreso</label>
        </form>
      </dialog>
      {profilePhoto && <img src={profilePhoto}></img>}
      <button onClick={signUserOut}>Salir</button>
      <h1>{name} • Nummis</h1>
      <h3>Dinero restante: </h3>
      {balance >= 0 ? <h2 style={{ color: "limegreen" }}>${balance} </h2> : <h2 style={{ color: "red" }}>-${balance * -1} </h2>}
      <h4>Ingresos:</h4>
      <p>${income}</p>
      <h4>Gastos:</h4>
      <p>${expenses}</p>

      <AddTransactionForm />

      <h3>Transacción</h3>
      <ul>
        {transactions.map((transaction) => {
          const { description, transactionAmount, transactionType, transactionId, createdAt } = transaction;

          return (
            <li key={transactionId}>
              <h4>{description}</h4>
              <button onClick={() => deleteTransaction(transactionId)}>Borrar</button>
              <button
                onClick={() => {
                  setAddUpdateInput(transaction);
                  document.getElementById("updateTransactionPopup").showModal();
                }}
              >
                Editar
              </button>
              <p>{createdAt?.toDate().toDateString()}</p>
              <p>
                ${transactionAmount} • {""}
                <span style={{ color: transactionType === "expense" ? "red" : "limegreen" }}>
                  {transactionType === "expense" ? "gasto" : "ingreso"}
                </span>
              </p>
            </li>
          );
        })}
      </ul>
    </MainPageContext.Provider>
  );
};
