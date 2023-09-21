import { useBalanceByAccount } from "../hooks/useBalanceByAccount";
import { moneyFormat } from "../helpers/moneyFormatHelper";

export const BalanceSummary = () => {
  const { balanceByAccount } = useBalanceByAccount();
  let totalExpenses = 0;
  let totalIncome = 0;
  let totalFrom = 0;
  let totalTo = 0;
  let totalBalance = 0;

  return (
    <div className="container">
      {balanceByAccount.map((thisAccount) => {
        const { name, accountBalance, accountExpenses, accountIncome, transfersFrom, transfersTo, accountId, color } = thisAccount;
        totalExpenses += accountExpenses;
        totalIncome += accountIncome;
        totalFrom += transfersFrom;
        totalTo += transfersTo;
        totalBalance = totalIncome + totalFrom - totalExpenses - totalTo;

        return (
          <div key={accountId} className="subcontainer">
            <p>
              Cuenta: <span style={{ color }}>{name}</span>
            </p>
            <p>Ingresos: {moneyFormat(accountIncome)}</p>
            <p>De otras cuentas: {moneyFormat(transfersFrom)}</p>
            <p>Gastos: {moneyFormat(accountExpenses)}</p>
            <p>Hacia otras cuentas: {moneyFormat(transfersTo)}</p>
            <p>Restante: {moneyFormat(accountBalance)}</p>
          </div>
        );
      })}
      <div key={"totals"} className="subcontainer">
        <p>Total:</p>
        <p>Ingresos: {moneyFormat(totalIncome)}</p>
        <p>De otras cuentas: {moneyFormat(totalFrom)}</p>
        <p>Gastos: {moneyFormat(totalExpenses)}</p>
        <p>Hacia otras cuentas: {moneyFormat(totalTo)}</p>
        <p>Restante: {moneyFormat(totalBalance)}</p>
      </div>
    </div>
  );
};
