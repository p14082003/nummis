import { useEffect, useState } from "react";
import { query, collection, where, orderBy, onSnapshot } from "firebase/firestore";
import { accountsCollection, db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetAccounts = () => {
  const [accounts, setAccounts] = useState([]);

  const { userID } = useGetUserInfo();

  const getAccounts = async () => {
    let unsuscribe;
    try {
      const queryTransactions = query(collection(db, accountsCollection), where("userID", "==", userID), orderBy("name", "asc"));

      unsuscribe = onSnapshot(queryTransactions, (snapshot) => {
        let docs = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          const accountId = doc.id;

          docs.push({ ...data, accountId });
        });

        setAccounts(docs);
      });
    } catch (err) {
      console.error(err);
    }

    return () => unsuscribe();
  };

  useEffect(() => {
    getAccounts();
  }, []);

  return { accounts };
};
