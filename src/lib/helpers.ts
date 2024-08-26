import { format, sub } from "date-fns";

export const getDates = (
  actualDates: { date: string; clicks: number }[] = []
) => {
  const date7DaysAgo = sub(new Date(), { days: 6 });
  let current = new Date(date7DaysAgo);
  const dates = [];
  while (current <= new Date()) {
    const date = format(new Date(current), "yyyy-MM-dd");
    const existing = actualDates.find((d) => d.date === date);
    if (existing) {
      dates.push({ date, clicks: existing.clicks });
    } else {
      dates.push({ date, clicks: 0 });
    }
    current.setDate(current.getDate() + 1);
  }

  return dates;
};
