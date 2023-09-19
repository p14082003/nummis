import { useContext } from "react";
import { useModifyTransaction } from "../hooks/useModifyTransaction";
import { useGetTransactions } from "../hooks/useGetTransactions";
import { useGetAccounts } from "../hooks/useGetAccounts";
import { ExpensePageContext } from "../pages/expense-page";
import { toDdMmYyyy } from "../helpers/dateFormatHelper";

export const TransactionList = () => {
  const { setUpdateTransactionInput } = useContext(ExpensePageContext);
  const { deleteTransaction } = useModifyTransaction();
  const { transactions } = useGetTransactions();
  const { accounts } = useGetAccounts();

  return (
    <div className="container">
      <h3>Transacciones</h3>
      <ul>
        {transactions.map((transaction) => {
          const { description, amount, trType, transactionId, accountId, date } = transaction;
          const accountName = accounts.find((account) => account.accountId === accountId).name;

          console.log();

          return (
            <li key={transactionId}>
              <h4>{description}</h4>
              <button onClick={() => deleteTransaction(transactionId)}>Borrar</button>
              <button
                onClick={() => {
                  setUpdateTransactionInput(transaction);
                  document.getElementById("updateTransactionPopup").showModal();
                }}
              >
                Editar
              </button>
              <p>{toDdMmYyyy(date)}</p>
              <p>Account: {accountName}</p>
              <p>Id: {accountId}</p>
              <p>
                ${amount} • {""}
                <span style={{ color: trType === "expense" ? "red" : "limegreen" }}>{trType === "expense" ? "gasto" : "ingreso"}</span>
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
