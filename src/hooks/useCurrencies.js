import { useState, useEffect } from 'react';

export const useCurrencies = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [currencies, setCurrencies] = useState([]);

  const fetchData = () => {
    fetch('https://data.messari.io/api/v1/assets')
      .then(res => res.json())
      .then(res => {
        setCurrencies(res.data);
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setIsInitialLoading(false);
      });
  };

  const refetch = () => {
    fetchData();
  }

  useEffect(() => {
    setIsInitialLoading(true);
    fetchData();
  }, []);

  return { currencies, refetch, isInitialLoading };
};
