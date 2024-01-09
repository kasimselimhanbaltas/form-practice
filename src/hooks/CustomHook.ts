import axios from "axios";
import { useState, useEffect } from "react";

const useApiRequest = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url: string, method: string, payload: any) => {
    if (!url) return;

    setLoading(true);
    setError(null);

    const options = {
      method,
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: payload ? JSON.stringify(payload) : undefined,
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const result = await response.json();
      setData(result);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
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
