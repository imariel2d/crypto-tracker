import { useState, useEffect } from 'react';

export const useCurrencies = () => {
  const [currencies, setCurrencies] = useState([]);

  const fetchData = () => {
    fetch('https://data.messari.io/api/v1/assets')
      .then(res => res.json())
      .then(res => {
        setCurrencies(res.data);
      })
      .catch(err => {
        console.log(err)
      });
  };

  const refetch = () => {
    fetchData();
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { currencies, refetch };
};
