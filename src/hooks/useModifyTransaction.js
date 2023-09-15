import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { currentCollection, db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useModifyTransaction = () => {
  const { userID } = useGetUserInfo();

  const addTransaction = async (addTransactionInput) => {
    await addDoc(collection(db, currentCollection), {
      ...addTransactionInput,
      userID,
      createdAt: serverTimestamp(),
    });
  };

  const deleteTransaction = async (transactionId) => {
    await deleteDoc(doc(db, currentCollection, transactionId));
  };

  const updateTransaction = async (addUpdateInput, transactionId) => {
    await updateDoc(doc(db, currentCollection, transactionId), addUpdateInput);
  };

  return { addTransaction, deleteTransaction, updateTransaction };
};
