import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase-config";

export const Nav = () => {
  const { name, profilePhoto, isAuth } = useGetUserInfo();
  const navigate = useNavigate();
  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      {isAuth && (
        <>
          {profilePhoto && <img src={profilePhoto}></img>}
          <button onClick={signUserOut}>Salir</button>
          <Link to="/expense-page">Transacciones</Link>
          <Link to="/overview-page">Resumen de cuenta</Link>
          <Link to="/account-page">Cuentas</Link>
          <h1 className="">{name} • Nummis</h1>
        </>
      )}
    </div>
  );
};
