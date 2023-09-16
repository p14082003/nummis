import { useContext } from "react";
import { MainPageContext } from "../pages/expense-tracker";

export const AddTransactionForm = () => {
  const { addTransactionInput, setAddTransactionInput, addTransaction } = useContext(MainPageContext);

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction(addTransactionInput);
    setAddTransactionInput({
      description: "",
      transactionAmount: "",
      transactionType: "expense",
    });
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
