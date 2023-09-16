import { updateDoc, doc } from "firebase/firestore";
import { transactionCollection, db } from "../../config/firebase-config";

export const useUpdateTransaction = () => {
  const updateTransaction = async (addUpdateInput, transactionId) => {
    await updateDoc(doc(db, transactionCollection, transactionId), addUpdateInput);
  };

  return { updateTransaction };
};
