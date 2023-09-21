import { useContext } from "react";
import { useModifyAccount } from "../hooks/useModifyAccount";
import { useGetAccounts } from "../hooks/useGetAccounts";
import { AccountPageContext } from "../pages/account-page";

export const AccountList = () => {
  const { setUpdateAccountInput } = useContext(AccountPageContext);
  const { deleteAccount } = useModifyAccount();
  const { accounts } = useGetAccounts();

  return (
    <div className="container">
      <h3>Cuentas</h3>
      <ul>
        {accounts.map((account) => {
          const { accountId, name, color } = account;

          return (
            <li key={accountId} className="subcontainer">
              <h4 style={{ color }}>{name}</h4>
              <p>Id: {accountId}</p>
              <button onClick={() => deleteAccount(accountId)}>Borrar</button>
              {
                <button
                  onClick={() => {
                    setUpdateAccountInput(account);
                    document.getElementById("updateAccountPopup").showModal();
                  }}
                >
                  Editar
                </button>
              }
            </li>
          );
        })}
      </ul>
    </div>
  );
};
