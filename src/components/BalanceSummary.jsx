import { useBalanceByAccount } from "../hooks/useBalanceByAccount";

export const BalanceSummary = () => {
  const { balanceByAccount } = useBalanceByAccount();
  console.log(balanceByAccount);

  return (
    <div className="container">
      {balanceByAccount.map((thisAccount) => {
        const { name, accountBalance, accountExpenses, accountIncome } = thisAccount;
        return (
          <div>
            <p>Cuenta: {name}</p>
            <p>Ingresos: {accountIncome}</p>
            <p>Gastos: {accountExpenses}</p>
            <p>Restante: {accountBalance}</p>
          </div>
        );
      })}
    </div>
  );
};
