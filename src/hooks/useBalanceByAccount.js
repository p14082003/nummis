import { useGetTransactions } from "./useGetTransactions";
import { useGetAccounts } from "./useGetAccounts";

export const useBalanceByAccount = () => {
  const { transactions } = useGetTransactions();
  const { accounts } = useGetAccounts();
  let balanceByAccount = [];

  accounts.forEach((account) => {
    let accountExpenses = 0;
    let accountIncome = 0;
    let accountBalance = 0;
    let transfersFrom = 0;
    let transfersTo = 0;

    transactions.forEach((transaction) => {
      if (account.accountId === transaction.accountId) {
        transaction.trType === "income" && (accountBalance += Number(transaction.amount));
        transaction.trType === "expense" && (accountBalance -= Number(transaction.amount));
        accountBalance += accountIncome - accountExpenses;
      }
      if (transaction.trType === "transfer") {
        account.accountId === transaction.accountId && (transfersTo += Number(transaction.amount));
        account.accountId === transaction.toAccountId && (transfersFrom += Number(transaction.amount));
        accountBalance += transfersFrom - transfersTo;
      }
    });

    balanceByAccount.push({ ...account, accountExpenses, accountIncome, accountBalance, transfersTo, transfersFrom });
  });

  return { balanceByAccount };
};
