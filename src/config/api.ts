export const API_BASE_URL = process.env.AUTOMTEST_BACKEND_URL || '';
export const API_KEY = process.env.AUTOMTEST_API_KEY || process.env.API_KEY || '';

export function getApiHeaders(
  headers: Record<string, string> = {},
): Record<string, string> {
  if (!API_KEY) {
    return headers;
  }

  return {
    ...headers,
    'X-API-Key': API_KEY,
  };
}
