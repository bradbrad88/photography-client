import { useState, useCallback } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const useFetch = () => {
  const [working, setWorking] = useState(false);

  const fetchJSON = useCallback(async <T>(req: AxiosRequestConfig): Promise<T | null> => {
    const res = await sendRequest<T>(req);
    if (!res) return null;
    return res.data;
  }, []);

  const deleteData = useCallback(async (req: AxiosRequestConfig): Promise<true | null> => {
    const res = await sendRequest(req);
    if (!res) return null;
    return true;
  }, []);

  const postImage = async <T>(req: AxiosRequestConfig): Promise<T | null> => {
    const res = await sendRequest<T>(req);
    if (!res) return null;
    return res.data;
  };

  const sendRequest = async <T>(req: AxiosRequestConfig) => {
    req.baseURL = process.env.REACT_APP_SERVER_API;
    setWorking(true);
    try {
      const res: AxiosResponse<T> = await axios(req);
      setWorking(false);
      return res;
    } catch (error) {
      console.error(error);
      setWorking(false);
      return null;
    }
  };

  return { fetchJSON, postImage, deleteData, working };
};

export default useFetch;
