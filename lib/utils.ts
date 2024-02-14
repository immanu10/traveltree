import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitialFromFullName(full_name: string) {
  return full_name
    .split(" ")
    .map((name) => name[0].toUpperCase())
    .join("")
    .slice(0, 2);
}

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export type BestTime = (typeof MONTHS)[number][];

const calenderMonthIndex = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

// input: ["Feb","Mar","Jan","Jun","Aug","Jul","Nov","Dec"]
// output: "Jan-Mar,Jun-Aug,Nov,Dec"

// input: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
// output: "All months"
export function formateBestTime(months: BestTime) {
  const sortedMonths = months.sort(
    (a, b) => calenderMonthIndex[a] - calenderMonthIndex[b]
  );

  let formattedString = "";
  let startMonth = sortedMonths[0];
  let endMonth = sortedMonths[0];

  for (let i = 1; i < sortedMonths.length; i++) {
    if (
      calenderMonthIndex[sortedMonths[i]] ===
      calenderMonthIndex[endMonth] + 1
    ) {
      endMonth = sortedMonths[i];
    } else {
      formattedString +=
        startMonth === endMonth
          ? `${startMonth}, `
          : `${startMonth}-${endMonth}, `;
      startMonth = sortedMonths[i];
      endMonth = sortedMonths[i];
    }
  }

  // Add the last group
  formattedString +=
    startMonth === endMonth ? `${startMonth}` : `${startMonth}-${endMonth}`;

  // Handle special case when all months are included
  if (formattedString === "Jan-Dec") {
    formattedString = "All months";
  }

  return formattedString;
}
