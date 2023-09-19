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
    transactions.forEach((transaction) => {
      if (account.accountId == transaction.accountId) {
        if (transaction.trType === "expense") {
          accountExpenses += Number(transaction.amount);
        } else {
          accountIncome += Number(transaction.amount);
        }
        accountBalance = accountIncome - accountExpenses;
      }
    });

    balanceByAccount.push({ id: account.accountId, name: account.name, accountExpenses, accountIncome, accountBalance });
  });

  return { balanceByAccount };
};
