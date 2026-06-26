const BASE_URL = 'https://new-api-staging.rydeu.com';
const DEFAULT_TIMEOUT = 8000;

interface RequestOptions extends RequestInit {
  timeout?: number;
}

export async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { timeout = DEFAULT_TIMEOUT, ...customOptions } = options;
  
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const headers = {
    'Content-Type': 'application/json',
    ...(customOptions.headers || {}),
  };

  const config: RequestInit = {
    ...customOptions,
    headers,
    signal: controller.signal,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    clearTimeout(id);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    clearTimeout(id);
    // If the API request times out or network connection fails, show "Backend is not working"
    if (error.name === 'AbortError' || error.message?.includes('Network request failed')) {
      throw new Error('Backend is not working');
    }
    throw error;
  }
}

// Concrete API calls
export const api = {
  login: (email: string, password: string) => {
    return request<any>('/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        type: 'customer',
      }),
    });
  },
};
export default api;
