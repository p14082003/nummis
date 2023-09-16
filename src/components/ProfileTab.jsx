import { signOut } from "firebase/auth";
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { auth } from "../config/firebase-config";
import { useNavigate } from "react-router-dom";

export const ProfileTab = () => {
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

  if (!isAuth)
    return (
      <>
        <p>session expired!</p>
        <button onClick={() => navigate("/")}>Login</button>
      </>
    );

  return (
    <>
      {profilePhoto && <img src={profilePhoto}></img>}
      <button onClick={signUserOut}>Salir</button>
      <h1>{name} • Nummis</h1>
    </>
  );
};
