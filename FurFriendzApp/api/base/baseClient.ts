abstract class BaseClient {
  // The base URL is static for all derived classes
  protected static baseUrl: string = "https://api.example.com";

  protected async request<T>(method: HttpMethod, endpoint: string, body?: any): Promise<T> {
      const url = `${BaseClient.baseUrl}${endpoint}`;
      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
          // Add any other headers like Authorization if needed
        },
      };

      // Add body to the request for methods that require it
      if (body) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Request failed: ${error.message}`);
      }

      return response.json();
    }

}