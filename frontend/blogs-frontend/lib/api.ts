export const API_URL = "http://127.0.0.1:8000";

export function imageUrl(path: string) {
  return `${API_URL}${path}`;
}
