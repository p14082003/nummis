import { deleteDoc, doc } from "firebase/firestore";
import { transactionCollection, db } from "../../config/firebase-config";

export const useDeleteTransaction = () => {
  const deleteTransaction = async (transactionId) => {
    await deleteDoc(doc(db, transactionCollection, transactionId));
  };

  return { deleteTransaction };
};
