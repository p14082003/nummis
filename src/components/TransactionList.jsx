import { useContext } from "react";
import { useModifyTransaction } from "../hooks/useModifyTransaction";
import { useGetTransactions } from "../hooks/useGetTransactions";
import { useGetAccounts } from "../hooks/useGetAccounts";
import { ExpensePageContext } from "../pages/expense-page";
import { toDdMmYyyy } from "../helpers/dateFormatHelper";
import { moneyFormat } from "../helpers/moneyFormatHelper";

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
          const fromAccount = accounts.find((account) => account.accountId === transaction.accountId) ?? { name: "cuenta eliminada" };
          const toAccount = accounts.find((account) => account.accountId === transaction.toAccountId);

          const { description, amount, trType, transactionId, date } = transaction;

          if (!toAccount && trType === "transfer") toAccount = { name: "cuenta eliminada" };

          return (
            <li key={transactionId} style={{ maxHeight: "20em" }}>
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
              <p>
                Cuenta: <span style={{ color: fromAccount.color }}>{fromAccount.name}</span>
                {toAccount && (
                  <span>
                    A la cuenta: <span style={{ color: toAccount?.color }}>{toAccount?.name}</span>
                  </span>
                )}
              </p>
              <p>Id: {transactionId}</p>
              <p>
                {moneyFormat(amount)} {"•"}
                {(trType === "expense" && <span style={{ color: "red" }}>gasto</span>) ||
                  (trType === "income" && <span style={{ color: "forestgreen" }}>ingreso</span>) ||
                  (trType === "transfer" && <span style={{ color: "orange" }}>transferencia</span>)}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
