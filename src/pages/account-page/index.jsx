//LIBRARIES
import { useState, createContext } from "react";

//DOM COMPONENTS AND STYLE
import "./styles.css";
import { AddAccountForm } from "../../components/AddAccountForm";
import { UpdateAccountForm } from "../../components/UpdateAccountForm";
import { AccountList } from "../../components/AccountList";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useNavigate } from "react-router-dom";
import { accountTemplate } from "../../config/firebase-config";

export const AccountPageContext = createContext();

export const AccountPage = () => {
  const { isAuth } = useGetUserInfo();
  const navigate = useNavigate();
  const [updateAccountInput, setUpdateAccountInput] = useState(accountTemplate);

  if (!isAuth)
    return (
      <div>
        No se ha iniciado sesión<button onClick={() => navigate("/")}>Iniciar sesión</button>
      </div>
    );

  return (
    <AccountPageContext.Provider value={{ updateAccountInput, setUpdateAccountInput }}>
      <UpdateAccountForm /> {/*uses { updateAccountInput, setUpdateAccountInput }*/}
      <AddAccountForm />
      <AccountList />
    </AccountPageContext.Provider>
  );
};
