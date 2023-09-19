import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { transactionCollection, db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useModifyTransaction = () => {
  const { userID } = useGetUserInfo();

  const addTransaction = async (addTransactionInput) => {
    await addDoc(collection(db, transactionCollection), {
      ...addTransactionInput,
      userID,
      createdAt: serverTimestamp(),
    });
  };

  const deleteTransaction = async (transactionId) => {
    await deleteDoc(doc(db, transactionCollection, transactionId));
  };

  const updateTransaction = async (updateTransactionInput) => {
    await updateDoc(doc(db, transactionCollection, updateTransactionInput.transactionId), updateTransactionInput);
  };

  return { addTransaction, deleteTransaction, updateTransaction };
};
