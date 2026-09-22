import moment from "moment";

export function parseDate(value) {
  if (!value) return null;

  if (value instanceof Date) {
    const parsed = moment(value);
    return parsed.isValid() ? parsed.toDate() : null;
  }

  if (Array.isArray(value) && value.length >= 3) {
    const parsed = moment({
      year: value[0],
      month: value[1] - 1,
      day: value[2],
      hour: value[3] || 0,
      minute: value[4] || 0,
      second: value[5] || 0,
    });
    return parsed.isValid() ? parsed.toDate() : null;
  }

  const parsed = moment(value);
  return parsed.isValid() ? parsed.toDate() : null;
}

export function formatShortDate(value) {
  const date = parseDate(value);
  if (!date) return "—";
  return moment(date).format("D MMM YYYY");
}

export function formatApiDate(value) {
  const date = parseDate(value);
  if (!date) return null;
  return moment(date).format("YYYY-MM-DD");
}
