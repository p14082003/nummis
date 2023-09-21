export const toDdMmYyyy = (date) => {
  const today = new Date().toISOString().split("T")[0];
  let formatted = new Date(Date.parse(date.toString())).toLocaleDateString("es-AR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC",
  });
  return <span style={{ color: date <= today ? "forestgreen" : "blue" }}>{formatted}</span>;
};
