export const currentDateBD = () => {
  const currentDate = new Date();

  const currentDateInBD = new Date(
    currentDate.toLocaleString("en-US", { timeZone: "Asia/Dhaka" })
  );

  const currentDay = currentDateInBD.getDate();
  const currentMonth = currentDateInBD.toLocaleString("default", {
    month: "long",
  });

  const currentYear = currentDateInBD.getFullYear().toString();

  return { currentYear, currentMonth, currentDay, currentDateInBD };
};
