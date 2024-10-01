export function parseJson(json, fallback) {
  try {
    return JSON.parse(json) ?? fallback;
  } catch (e) {
    return fallback;
  }
}
