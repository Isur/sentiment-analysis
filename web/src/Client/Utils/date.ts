export default {
  daysInMonth: (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  },
  firstDayInMonth: (year: number, month: number) => {
    return new Date(year, month - 1, 1).getDay();
  },
};

