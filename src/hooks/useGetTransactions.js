import { useEffect, useState } from "react";
import { query, collection, where, orderBy, onSnapshot } from "firebase/firestore";
import { transactionCollection, db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionTotals, setTransactionTotals] = useState({
    balance: 0.0,
    income: 0.0,
    expenses: 0.0,
  });

  const { userID } = useGetUserInfo();

  const getTransactions = async () => {
    let unsuscribe;
    try {
      const queryTransactions = query(collection(db, transactionCollection), where("userID", "==", userID), orderBy("createdAt", "desc"));

      unsuscribe = onSnapshot(queryTransactions, (snapshot) => {
        let docs = [];
        let totalIncome = 0;
        let totalExpenses = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          const transactionId = doc.id;

          docs.push({ ...data, transactionId });
          data.transactionType === "expense" ? (totalExpenses += Number(data.transactionAmount)) : (totalIncome += Number(data.transactionAmount));
        });

        setTransactions(docs);
        let balance = totalIncome - totalExpenses;
        setTransactionTotals({ balance, expenses: totalExpenses, income: totalIncome });
      });
    } catch (err) {
      console.error(err);
    }

    return () => unsuscribe();
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return { transactions, transactionTotals };
};
