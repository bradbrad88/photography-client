import { useState } from "react";
const useFetch = () => {
  const [working, setWorking] = useState(false);

  const fetchJSON = async <T>(req: Request): Promise<T | null> => {
    const res = await sendRequest(req);
    if (!res) return null;
    if (res.ok) return await res.json();
    return null;
  };

  const deleteData = async (req: Request): Promise<true | null> => {
    const res = await sendRequest(req);
    if (!res) return null;
    if (res.ok) return true;
    return null;
  };

  const sendRequest = async (req: Request) => {
    setWorking(true);
    try {
      const res = await fetch(req);
      setWorking(false);
      return res;
    } catch (error) {
      console.error(error);
      setWorking(false);
      return null;
    }
  };

  return { fetchJSON, deleteData, working };
};

export default useFetch;
