import { useBalanceByAccount } from "../hooks/useBalanceByAccount";
import { moneyFormat } from "../helpers/moneyFormatHelper";

export const BalanceSummary = () => {
  const { balanceByAccount } = useBalanceByAccount();

  return (
    <div className="container">
      {balanceByAccount.map((thisAccount) => {
        const { name, accountBalance, accountExpenses, accountIncome, transfersFrom, transfersTo, accountId, color } = thisAccount;
        return (
          <div key={accountId}>
            <p>
              Cuenta: <span style={{ color }}>{name}</span>
            </p>{" "}
            <p>Ingresos: {moneyFormat(accountIncome)}</p>
            <p>De otras cuentas: {moneyFormat(transfersFrom)}</p>
            <p>Gastos: {moneyFormat(accountExpenses)}</p>
            <p>Hacia otras cuentas: {moneyFormat(transfersTo)}</p>
            <p>Restante: {moneyFormat(accountBalance)}</p>
          </div>
        );
      })}
    </div>
  );
};
