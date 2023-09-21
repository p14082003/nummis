import { useState } from "react";
import { useModifyTransaction } from "../hooks/useModifyTransaction";
import { useGetAccounts } from "../hooks/useGetAccounts";
import { transactionTemplate } from "../config/firebase-config";

export const AddTransactionForm = () => {
  const today = new Date().toISOString().split("T")[0];
  const { addTransaction } = useModifyTransaction();
  const [addTransactionInput, setAddTransactionInput] = useState({ ...transactionTemplate, date: today });
  const { accounts } = useGetAccounts();

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction(addTransactionInput);
    setAddTransactionInput({ ...transactionTemplate, accountId: addTransactionInput.accountId, date: addTransactionInput.date });
  };

  return (
    <form onSubmit={onSubmit} autoComplete="off" className="container">
      <input
        id="date"
        type="date"
        defaultValue={today}
        required
        onChange={(e) => setAddTransactionInput({ ...addTransactionInput, date: e.target.value })}
      />

      <select id="accountId" required onChange={(e) => setAddTransactionInput({ ...addTransactionInput, accountId: e.target.value })}>
        <option value="" disabled selected hidden>
          Elegir una cuenta
        </option>
        {accounts.map((account) => {
          return account.accountId !== addTransactionInput.toAccountId && <option value={account.accountId}>{account.name}</option>;
        })}
      </select>

      <input
        id="description"
        type="text"
        placeholder="Descripción"
        value={addTransactionInput.description}
        required
        onChange={(e) => setAddTransactionInput({ ...addTransactionInput, description: e.target.value })}
      />

      <input
        id="amount"
        type="number"
        placeholder="Cantidad"
        value={addTransactionInput.amount}
        required
        onChange={(e) => setAddTransactionInput({ ...addTransactionInput, amount: e.target.value })}
      />

      <input
        type="radio"
        id="add-expense"
        value="expense"
        checked={addTransactionInput.trType === "expense"}
        onChange={(e) => setAddTransactionInput({ ...addTransactionInput, trType: e.target.value, toAccountId: "" })}
      />
      <label htmlFor="add-expense">Gasto</label>

      <input
        type="radio"
        id="add-income"
        value="income"
        checked={addTransactionInput.trType === "income"}
        onChange={(e) => setAddTransactionInput({ ...addTransactionInput, trType: e.target.value, toAccountId: "" })}
      />
      <label htmlFor="add-income">Ingreso</label>
      {/* FROM HERE */}
      <input
        type="radio"
        id="add-transfer"
        value="transfer"
        checked={addTransactionInput.trType === "transfer"}
        onChange={(e) => setAddTransactionInput({ ...addTransactionInput, trType: e.target.value })}
      />
      <label htmlFor="add-transfer">Transferencia</label>

      {addTransactionInput.trType == "transfer" && (
        <>
          <select
            id="toAccount"
            required
            onChange={(e) =>
              addTransactionInput.trType == "transfer" && setAddTransactionInput({ ...addTransactionInput, toAccountId: e.target.value })
            }
          >
            <option value="" disabled selected hidden>
              Elegir una cuenta
            </option>
            {accounts.map((account) => {
              return account.accountId !== addTransactionInput.accountId && <option value={account.accountId}>{account.name}</option>;
            })}
          </select>
        </>
      )}

      <button type="submit"> Agregar Transacción</button>
    </form>
  );
};
