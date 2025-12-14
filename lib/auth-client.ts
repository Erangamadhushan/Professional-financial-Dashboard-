export type ApiUser = {
  id: string;
  email: string;
  // any other safe fields your backend returns
};

const TOKEN_KEY = "token";

/** Save token to localStorage (and broadcast to other tabs) */
export function saveToken(token: string | null) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
    // write a timestamp to force storage event in some browsers
    localStorage.setItem("token-update-ts", String(Date.now()));
  } else {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem("token-update-ts", String(Date.now()));
  }
}

/** Get token from localStorage */
export function getTokenLocal(): string | null {
  return typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
}

/** Remove token */
export function clearToken() {
  saveToken(null);
}

/** Login via API — expects { user, token } in response */
export async function apiLogin(id: string, email: string ,apiPath = "/api/auth/me") {
  const res = await fetch(`${apiPath}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "login", id, email }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Login failed");
  }

  const data = await res.json();
  if (!data?.token) throw new Error("No token in response");
  saveToken(data.token);
  return data as { user: ApiUser; token: string };
}

/** Logout client-side (clears token) */
export async function apiLogout() {
  // optionally notify server to invalidate refresh token, etc.
  clearToken();
}

/** Fetch current user from /api/auth/me using token from localStorage */
export async function fetchCurrentUser(apiPath = "/api/auth/me"): Promise<{ user: ApiUser } | null> {
  const token = getTokenLocal();
  if (!token) return null;

  const res = await fetch(apiPath, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    // token invalid or expired — clear it
    clearToken();
    return null;
  }

  const data = await res.json();
  return data;
}
