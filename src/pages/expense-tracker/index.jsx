import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useModifyTransaction } from "../../hooks/useModifyTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";

import "./styles.css";
import { auth, currentCollection } from "../../config/firebase-config";

export const ExpenseTracker = () => {
  const { addTransaction, deleteTransaction, updateTransaction } =
    useModifyTransaction();
  const { transactions, transactionTotals } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();

  const emptyForm = {
    description: "",
    transactionAmount: "",
    transactionType: "expense",
  };

  const [addTransactionInput, setAddTransactionInput] = useState(emptyForm);
  const [addUpdateInput, setAddUpdateInput] = useState(emptyForm);

  const [editing, setEditing] = useState({ isEdit: false, id: "" });

  const { balance, income, expenses } = transactionTotals;

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction(addTransactionInput);
    setAddTransactionInput(emptyForm);
  };

  const onUpdate = (e) => {
    e.preventDefault();
    setEditing({ isEdit: false, id: "" });
    updateTransaction(addUpdateInput, editing.id);
    setAddUpdateInput(emptyForm);
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
    <>
      <div
        className="updateTransactionPopup"
        style={{ display: editing.isEdit ? "block" : "none" }}
      >
        Edit transaction
        <form className="add-transaction" onSubmit={onUpdate}>
          <button onClick={() => setEditing({ isEdit: false, id: "" })}>
            Cancel
          </button>
          <button type="submit">Save changes</button>
          <input
            type="text"
            placeholder="Descripción"
            value={addUpdateInput.description}
            required
            onChange={(e) =>
              setAddUpdateInput({
                ...addUpdateInput,
                description: e.target.value,
              })
            }
          />
          <input
            type="number"
            placeholder="Cantidad"
            value={addUpdateInput.transactionAmount}
            required
            onChange={(e) =>
              setAddUpdateInput({
                ...addUpdateInput,
                transactionAmount: e.target.value,
              })
            }
          />
          <input
            type="radio"
            id="expense"
            value="expense"
            checked={addUpdateInput.transactionType === "expense"}
            onChange={(e) =>
              setAddUpdateInput({
                ...addUpdateInput,
                transactionType: e.target.value,
              })
            }
          />
          <label htmlFor="expense">Gasto</label>
          <input
            type="radio"
            id="income"
            value="income"
            checked={addUpdateInput.transactionType === "income"}
            onChange={(e) =>
              setAddUpdateInput({
                ...addUpdateInput,
                transactionType: e.target.value,
              })
            }
          />
          <label htmlFor="income">Ingreso</label>
        </form>
      </div>
      <div className="expense-tracker">
        <div className="container">
          <h1>{name} • Nummis</h1>
          <div className="balance">
            <h3>Dinero restante: </h3>
            {balance >= 0 ? <h2>${balance} </h2> : <h2>-${balance * -1} </h2>}
          </div>
          <div className="Summary">
            <div className="income">
              <h4>Ingresos:</h4>
              <p>${income}</p>
            </div>
            <div className="expenses">
              <h4>Gastos:</h4>
              <p>${expenses}</p>
            </div>
          </div>
          <form className="add-transaction" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Descripción"
              value={addTransactionInput.description}
              required
              onChange={(e) =>
                setAddTransactionInput({
                  ...addTransactionInput,
                  description: e.target.value,
                })
              }
            />
            <input
              type="number"
              placeholder="Cantidad"
              value={addTransactionInput.transactionAmount}
              required
              onChange={(e) =>
                setAddTransactionInput({
                  ...addTransactionInput,
                  transactionAmount: e.target.value,
                })
              }
            />
            <input
              type="radio"
              id="expense"
              value="expense"
              checked={addTransactionInput.transactionType === "expense"}
              onChange={(e) =>
                setAddTransactionInput({
                  ...addTransactionInput,
                  transactionType: e.target.value,
                })
              }
            />
            <label htmlFor="expense">Gasto</label>
            <input
              type="radio"
              id="income"
              value="income"
              checked={addTransactionInput.transactionType === "income"}
              onChange={(e) =>
                setAddTransactionInput({
                  ...addTransactionInput,
                  transactionType: e.target.value,
                })
              }
            />
            <label htmlFor="income">Ingreso</label>

            <button type="submit"> Agregar Transacción</button>
          </form>
        </div>
        {profilePhoto && (
          <div className="profile">
            <img className="profile-photo" src={profilePhoto}></img>
            <button className="sign-out-button" onClick={signUserOut}>
              Salir
            </button>
          </div>
        )}
      </div>
      <div className="transactions">
        <h3>Transacción</h3>
        <p>DELETE - DB: {currentCollection}</p>
        <ul>
          {transactions.map((transaction) => {
            const {
              description,
              transactionAmount,
              transactionType,
              transactionId,
              createdAt,
            } = transaction;

            return (
              <li key={transactionId}>
                <h4>
                  {description}
                  <button
                    onClick={() => {
                      deleteTransaction(transactionId);
                    }}
                  >
                    Borrar
                  </button>
                  <button
                    onClick={() => {
                      setEditing({ isEdit: true, id: transactionId });
                    }}
                  >
                    Editar
                  </button>
                </h4>
                <p>{createdAt?.toDate().toDateString()}</p>
                <p>
                  ${transactionAmount} •
                  <label
                    style={{
                      color: transactionType === "expense" ? "red" : "green",
                    }}
                  >
                    {transactionType === "expense" ? "gasto" : "ingreso"}
                  </label>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
