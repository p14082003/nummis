import { useState } from "react";
import { useModifyAccount } from "../hooks/useModifyAccount";
import { accountTemplate } from "../config/firebase-config";

export const AddAccountForm = () => {
  const { addAccount } = useModifyAccount();
  const [addAccountInput, setAddAccountInput] = useState(accountTemplate);

  const onSubmit = (e) => {
    e.preventDefault();
    addAccount(addAccountInput);
    setAddAccountInput(accountTemplate);
  };

  return (
    <form onSubmit={onSubmit} autoComplete="off" className="container">
      <input
        id="name"
        type="text"
        placeholder="Nombre de la cuenta"
        value={addAccountInput.name}
        required
        onChange={(e) => setAddAccountInput({ ...addAccountInput, name: e.target.value })}
      />
      <input
        id="color"
        type="color"
        value={addAccountInput.color}
        required
        onChange={(e) => setAddAccountInput({ ...addAccountInput, color: e.target.value })}
      />
      <label htmlFor="color">Elegir un color</label>

      <button type="submit"> Agregar Cuenta</button>
    </form>
  );
};
