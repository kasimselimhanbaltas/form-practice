import axios from "axios";
import { useState, useEffect } from "react";

const useApiRequest = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url: string) => {
    if (!url) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(url);
      console.log(response);
      if (response.status !== 200) {
        throw new Error("Request failed");
      }
      const result = await response.data;
      setData(result);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    fetchData,
  };
};

export default useApiRequest;
