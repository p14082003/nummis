import { useNavigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";

export const ProfileTab = () => {
  const { name, profilePhoto } = useGetUserInfo();
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
    <div className="container" style={{ border: "3px solid #00ff00" }}>
      {profilePhoto && <img src={profilePhoto}></img>}
      <button onClick={signUserOut}>Salir</button>
      <h1>{name} • Nummis</h1>
    </div>
  );
};
