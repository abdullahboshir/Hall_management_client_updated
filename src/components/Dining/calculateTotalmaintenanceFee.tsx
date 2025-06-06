

export const calculateTotalmaintenanceFee = (row:any) => {
        const monthsWithZeroMaintenance: Record<string, string[]> = {}; // Object to store years and months

        for (const year in row?.mealInfo) {
          if (typeof row?.mealInfo[year] !== "object") continue; // Skip invalid years

          for (const month in row?.mealInfo[year]) {
            const monthData = row?.mealInfo[year][month];

            if (
              monthData &&
              typeof monthData.maintenanceFee === "number" &&
              monthData.maintenanceFee === 0
            ) {
              // ✅ Store the year inside the month key
              if (!monthsWithZeroMaintenance[year]) {
                monthsWithZeroMaintenance[year] = [];
              }
              monthsWithZeroMaintenance[year].push(month); // Store the year for this month
            }
          }
        }

        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

        const monthsArray = Object.entries(monthsWithZeroMaintenance)
          .flatMap(([year, months]) =>
            months.map((month) => ({
              year: parseInt(year),
              month,
              monthIndex: monthNames.indexOf(month),
            }))
          )
          .sort((a, b) => b.year - a.year || b.monthIndex - a.monthIndex) // Sort by most recent first
          .slice(0, 3);

          return {monthsWithZeroMaintenance, monthsArray};
};

