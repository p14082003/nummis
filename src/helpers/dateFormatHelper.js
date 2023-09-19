export const toDdMmYyyy = (date) => {
  return new Date(Date.parse(date.toString())).toLocaleDateString("es-AR", { year: "numeric", month: "2-digit", day: "2-digit", timeZone: "UTC" });
};
