import { useContext } from "react";
import { useModifyAccount } from "../hooks/useModifyAccount";
import { accountTemplate } from "../config/firebase-config";
import { AccountPageContext } from "../pages/account-page";

export const UpdateAccountForm = () => {
  const { updateAccountInput, setUpdateAccountInput } = useContext(AccountPageContext);
  const { updateAccount } = useModifyAccount();

  const onSubmit = (e) => {
    e.preventDefault();
    updateAccount(updateAccountInput);
    setUpdateAccountInput(accountTemplate);
    document.getElementById("updateAccountPopup").close();
  };

  return (
    <dialog id="updateAccountPopup" className="container">
      Edit account
      <form onSubmit={onSubmit} autoComplete="off">
        <input
          id="name"
          type="text"
          placeholder="Nombre de la cuenta"
          value={updateAccountInput.name}
          required
          onChange={(e) => setUpdateAccountInput({ ...updateAccountInput, name: e.target.value })}
        />
        <input
          id="color"
          type="color"
          value={updateAccountInput.color}
          required
          onChange={(e) => setUpdateAccountInput({ ...updateAccountInput, color: e.target.value })}
        />
        <label htmlFor="color">Elegir un color</label>

        <button
          onClick={() => {
            document.getElementById("updateAccountPopup").close();
          }}
        >
          Cancelar
        </button>
        <button type="submit">Guardar cambios</button>
      </form>
    </dialog>
  );
};
