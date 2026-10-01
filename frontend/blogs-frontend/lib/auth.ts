import { API_URL } from "@/lib/api";
import type { User } from "@/lib/types";

const AUTH_EVENT = "auth-change";

export function getToken() {
  return localStorage.getItem("token");
}

export function saveToken(token: string) {
  localStorage.setItem("token", token);
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function logout() {
  localStorage.removeItem("token");
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function onAuthChange(callback: () => void) {
  window.addEventListener(AUTH_EVENT, callback);
  return () => window.removeEventListener(AUTH_EVENT, callback);
}

export async function fetchCurrentUser(): Promise<User | null> {
  const token = getToken();
  if (!token) return null;

  const res = await fetch(`${API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  return res.json();
}
