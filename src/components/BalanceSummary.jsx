import { useGetTransactions } from "../hooks/useGetTransactions";

export const BalanceSummary = () => {
  const { transactionTotals } = useGetTransactions();
  const { balance, income, expenses } = transactionTotals;

  return (
    <div className="container">
      <h3>Dinero restante: </h3>
      {balance >= 0 ? <h2 style={{ color: "limegreen" }}>${balance} </h2> : <h2 style={{ color: "red" }}>-${balance * -1} </h2>}
      <h4>Ingresos:</h4>
      <p>${income}</p>
      <h4>Gastos:</h4>
      <p>${expenses}</p>
    </div>
  );
};
