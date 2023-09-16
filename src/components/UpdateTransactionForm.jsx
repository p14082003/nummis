import { useContext } from "react";
import { useModifyTransaction } from "../hooks/useModifyTransaction";
import { MainPageContext } from "../pages/expense-tracker";
import { transactionTemplate } from "../config/firebase-config";

export const UpdateTransactionForm = () => {
  const { addUpdateInput, setAddUpdateInput } = useContext(MainPageContext);
  const { updateTransaction } = useModifyTransaction();

  const onSubmit = (e) => {
    e.preventDefault();
    updateTransaction(addUpdateInput);
    setAddUpdateInput(transactionTemplate);
    document.getElementById("updateTransactionPopup").close();
  };

  return (
    <dialog id="updateTransactionPopup">
      Edit transaction
      <form onSubmit={onSubmit}>
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
  );
};
