import { deleteDoc, doc } from "firebase/firestore";
import { currentCollection, db } from "../../config/firebase-config";

export const useDeleteTransaction = () => {
  const deleteTransaction = async (transactionId) => {
    await deleteDoc(doc(db, currentCollection, transactionId));
  };

  return { deleteTransaction };
};
