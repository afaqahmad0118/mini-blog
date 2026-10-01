import { formatDate } from "./format";

test("formats a date nicely", () => {
  const result = formatDate("2026-01-05");
  expect(result).toBe("5 Jan 2026");
});

test("returns empty text when date is null", () => {
  expect(formatDate(null)).toBe("");
});

test("formats September", () => {
  expect(formatDate("2026-09-30")).toBe("30 Sept 2026");
});
