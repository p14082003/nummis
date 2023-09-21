export const moneyFormat = (num) => {
  const value = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(num);

  return <span style={{ color: num >= 0 ? "forestgreen" : "red" }}>{value}</span>;
};
