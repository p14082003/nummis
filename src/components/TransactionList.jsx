import { useContext } from "react";
import { useModifyTransaction } from "../hooks/useModifyTransaction";
import { useGetTransactions } from "../hooks/useGetTransactions";
import { MainPageContext } from "../pages/expense-tracker";

export const TransactionList = () => {
  const { setAddUpdateInput } = useContext(MainPageContext);
  const { deleteTransaction } = useModifyTransaction();
  const { transactions } = useGetTransactions();

  return (
    <>
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
    </>
  );
};
