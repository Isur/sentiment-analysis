import Dates from "./date";

describe("Date functions", () => {
  const scenarios = [
    { year: 2020, month: 9, answer: 30 },
    { year: 2020, month: 8, answer: 31 },
    { year: 2020, month: 7, answer: 31 },
    { year: 2012, month: 7, answer: 31 },
    { year: 1996, month: 2, answer: 29 },
    { year: 2004, month: 2, answer: 29 },
    { year: 1999, month: 2, answer: 28 },
  ];

  scenarios.forEach(s => {
    it(`Year: ${s.year} Month: ${s.month} should be ${s.answer} days`, () => {
      expect(Dates.daysInMonth(s.year, s.month)).toBe(s.answer);
    });
  });

  it("Should give first day of month", () => {
    expect(Dates.firstDayInMonth(2020, 9)).toBe(2);
  });
});
