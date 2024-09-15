import { useState, useEffect } from "react";

function useCurrencyInfo() {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch("/json/convert.json");
        const data = await res.json();
        setInfo(Object.keys(data));
      } catch (error) {
        console.error("Error fetching currency data:", error);
      }
    };
    fetchRates();
  }, []);

  return info;
}

export default useCurrencyInfo;
