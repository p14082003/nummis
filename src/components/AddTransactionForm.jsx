import { useState } from "react";
import { useModifyTransaction } from "../hooks/useModifyTransaction";
import { transactionTemplate } from "../config/firebase-config";

export const AddTransactionForm = () => {
  const { addTransaction } = useModifyTransaction();
  const [addTransactionInput, setAddTransactionInput] = useState(transactionTemplate);

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction(addTransactionInput);
    setAddTransactionInput(transactionTemplate);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Descripción"
        value={addTransactionInput.description}
        required
        onChange={(e) => setAddTransactionInput({ ...addTransactionInput, description: e.target.value })}
      />

      <input
        type="text"
        placeholder="Descripción"
        value={addTransactionInput.description}
        required
        onChange={(e) => setAddTransactionInput({ ...addTransactionInput, description: e.target.value })}
      />

      <input
        type="number"
        placeholder="Cantidad"
        value={addTransactionInput.transactionAmount}
        required
        onChange={(e) => setAddTransactionInput({ ...addTransactionInput, transactionAmount: e.target.value })}
      />

      <input
        type="radio"
        id="expense"
        value="expense"
        checked={addTransactionInput.transactionType === "expense"}
        onChange={(e) => setAddTransactionInput({ ...addTransactionInput, transactionType: e.target.value })}
      />
      <label htmlFor="expense">Gasto</label>

      <input
        type="radio"
        id="income"
        value="income"
        checked={addTransactionInput.transactionType === "income"}
        onChange={(e) => setAddTransactionInput({ ...addTransactionInput, transactionType: e.target.value })}
      />
      <label htmlFor="income">Ingreso</label>
      <button type="submit"> Agregar Transacción</button>
    </form>
  );
};
