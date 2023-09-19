import { useContext } from "react";
import { useModifyTransaction } from "../hooks/useModifyTransaction";
import { useGetAccounts } from "../hooks/useGetAccounts";
import { transactionTemplate } from "../config/firebase-config";
import { ExpensePageContext } from "../pages/expense-page";

export const UpdateTransactionForm = () => {
  const { updateTransactionInput, setUpdateTransactionInput } = useContext(ExpensePageContext);
  const { updateTransaction } = useModifyTransaction();
  const { accounts } = useGetAccounts();

  const onSubmit = (e) => {
    e.preventDefault();
    updateTransaction(updateTransactionInput);
    setUpdateTransactionInput(transactionTemplate);
    document.getElementById("updateTransactionPopup").close();
  };

  return (
    <dialog id="updateTransactionPopup" className="container">
      Edit transaction
      <form onSubmit={onSubmit} autoComplete="off">
        <input
          id="date"
          type="date"
          defaultValue={updateTransactionInput.date}
          required
          onChange={(e) => setUpdateTransactionInput({ ...updateTransactionInput, date: e.target.value })}
        />

        <select
          id="account"
          value={updateTransactionInput.accountId}
          required
          onChange={(e) => setUpdateTransactionInput({ ...updateTransactionInput, accountId: e.target.value })}
        >
          {accounts.map((account) => {
            return <option value={account.accountId}>{account.name}</option>;
          })}
        </select>

        <input
          type="text"
          placeholder="Descripción"
          value={updateTransactionInput.description}
          required
          onChange={(e) => setUpdateTransactionInput({ ...updateTransactionInput, description: e.target.value })}
        />

        <input
          type="number"
          placeholder="Cantidad"
          value={updateTransactionInput.amount}
          required
          onChange={(e) => setUpdateTransactionInput({ ...updateTransactionInput, amount: e.target.value })}
        />

        <input
          type="radio"
          id="update-expense"
          value="expense"
          checked={updateTransactionInput.trType === "expense"}
          onChange={(e) => setUpdateTransactionInput({ ...updateTransactionInput, trType: e.target.value })}
        />
        <label htmlFor="update-expense">Gasto</label>

        <input
          type="radio"
          id="update-income"
          value="income"
          checked={updateTransactionInput.trType === "income"}
          onChange={(e) => setUpdateTransactionInput({ ...updateTransactionInput, trType: e.target.value })}
        />
        <label htmlFor="update-income">Ingreso</label>

        <button
          onClick={() => {
            document.getElementById("updateTransactionPopup").close();
            console.log(accounts);
          }}
        >
          Cancelar
        </button>
        <button type="submit">Guardar cambios</button>
      </form>
    </dialog>
  );
};
