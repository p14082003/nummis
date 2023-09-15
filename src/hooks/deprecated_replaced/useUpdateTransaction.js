import { updateDoc, doc } from "firebase/firestore";
import { currentCollection, db } from "../../config/firebase-config";

export const useUpdateTransaction = () => {
  const updateTransaction = async (addUpdateInput, transactionId) => {
    await updateDoc(doc(db, currentCollection, transactionId), addUpdateInput);
  };

  return { updateTransaction };
};
