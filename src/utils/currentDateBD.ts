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

export const formattedDate = (isoDateString: string) => {
  const date = new Date(isoDateString);

  // Get the day, month, and year
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" }); // Month as 3-letter abbreviation
  const year = date.getFullYear();

  // Format the day with leading zero if less than 10
  const formattedDay = day < 10 ? `0${day}` : day;

  return `${year}-${month}-${formattedDay}`;
};

export const isYesterdayBD = (date: Date): boolean => {
  const now = new Date();

  // Get current time in BD
  const currentBD = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Dhaka" })
  );

  // Get yesterday in BD
  currentBD.setDate(currentBD.getDate() - 1);

  // Format both dates to yyyy-mm-dd for easy comparison
  const inputDate = new Date(
    new Date(date).toLocaleString("en-US", { timeZone: "Asia/Dhaka" })
  );

  const format = (d: Date) =>
    `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

  return format(inputDate) === format(currentBD);
};

export const convertToBDDate = (date: Date | string) => {
  return new Date(
    new Date(date).toLocaleString("en-US", { timeZone: "Asia/Dhaka" })
  );
};
