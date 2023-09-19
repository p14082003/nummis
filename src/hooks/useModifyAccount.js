import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { accountsCollection, db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useModifyAccount = () => {
  const { userID } = useGetUserInfo();

  const addAccount = async (addAccountInput) => {
    await addDoc(collection(db, accountsCollection), {
      ...addAccountInput,
      userID,
      createdAt: serverTimestamp(),
    });
  };

  const deleteAccount = async (accountId) => {
    await deleteDoc(doc(db, accountsCollection, accountId));
  };

  const updateAccount = async (updateTransactionInput) => {
    await updateDoc(doc(db, accountsCollection, updateTransactionInput.accountId), updateTransactionInput);
  };

  return { addAccount, deleteAccount, updateAccount };
};
