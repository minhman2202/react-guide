import {useCallback, useEffect, useState} from "react";

/**
 * Sends an HTTP request to the specified URL with optional configuration
 *
 * @param {string} url - The URL to send the request to
 * @param {Object} config - Request configuration object (optional)
 * @param {string} config.method - HTTP method (GET, POST, PUT, DELETE, etc.)
 * @param {Object} config.headers - Request headers
 * @param {Object|string} config.body - Request body
 *
 * @returns {Promise<any>} The parsed JSON response data
 *
 * @throws {Error} Throws an error if the response is not ok (status code outside 200-299)
 *                 with either the server error message or default message
 *
 * @example
 * // GET request
 * const data = await sendHttpRequest('https://api.example.com/data');
 *
 * // POST request
 * const response = await sendHttpRequest('https://api.example.com/create', {
 *   method: 'POST',
 *   headers: {
 *     'Content-Type': 'application/json'
 *   },
 *   body: JSON.stringify({ name: 'John' })
 * });
 */
async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);

  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData.message || 'Failed to send request.');
  }

  return responseData;
}

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const sendRequest = useCallback(async function sendRequest() {
    setIsLoading(true);
    try {
      const resData = await sendHttpRequest(url, config);
      setData(resData);
    } catch (error) {
      setError(error.message || 'Something went wrong!');
    }

    // after sending request, reset loading state
    setIsLoading(false);
  }, [url, config]);

  useEffect(() => {
    if ((config && (config.method === 'GET' || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest
  };

}