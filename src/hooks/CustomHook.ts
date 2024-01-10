import axios from "axios";
import { useState, useEffect } from "react";

const useApiRequest = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com", // Replace with your API base URL
    headers: {
      "Content-Type": "application/json",
      // Add any common headers if needed
    },
  });
  // Request interceptor
  api.interceptors.request.use(
    (config) => {
      console.log("Request in incterceptor! 📧 ", config);
      setLoading(true);
      return config;
    },
    (error) => {
      setLoading(false);
      return Promise.reject(error);
    }
  );

  // Response interceptor
  api.interceptors.response.use(
    (response) => {
      setLoading(false);
      setData(response.data);
      return response;
    },
    (error) => {
      setLoading(false);
      setError(error.message || "Something went wrong");
      return Promise.reject(error);
    }
  );

  const fetchData = async (url: string, method: string, payload: any) => {
    setData(null);
    if (!url) return;

    setLoading(true);
    setError(null);

    try {
      const response = await api.request({
        url,
        method,
        data: payload,
      });

      return response.data;
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      throw err;
    }
  };
  const get = (url: string) => fetchData(url, "GET", null);
  const post = (url: string, payload: any) => fetchData(url, "POST", payload);
  const put = (url: string, payload: any) => fetchData(url, "PUT", payload);

  return {
    data,
    loading,
    error,
    get,
    post,
    put,
  };
};

export default useApiRequest;
