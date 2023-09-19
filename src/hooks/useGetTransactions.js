import { useEffect, useState } from "react";
import { query, collection, where, orderBy, onSnapshot } from "firebase/firestore";
import { transactionCollection, db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  const { userID } = useGetUserInfo();

  const getTransactions = async () => {
    let unsuscribe;
    try {
      const queryTransactions = query(
        collection(db, transactionCollection),
        where("userID", "==", userID),
        orderBy("date", "desc"),
        orderBy("createdAt", "desc")
      );

      unsuscribe = onSnapshot(queryTransactions, (snapshot) => {
        let docs = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          const transactionId = doc.id;

          docs.push({ ...data, transactionId });
        });

        setTransactions(docs);
      });
    } catch (err) {
      console.error(err);
    }

    return () => unsuscribe();
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return { transactions };
};
