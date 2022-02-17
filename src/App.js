import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CurrencyConverter from './components/CurrencyConverter';
import { currencyRatesAPI } from './api';
import s from './App.module.css';

export const App = () => {
  const [currencyRatesArray, setcurrencyRatesArray] = useState([]);

  useEffect(() => {
    if (!currencyRatesArray.length) {
      const savedRatesArray = localStorage.getItem('currencyRatesArray');
      const parsedRatesArray = JSON.parse(savedRatesArray);

      if (parsedRatesArray) {
        setcurrencyRatesArray(parsedRatesArray);
        return;
      }

      currencyRatesAPI
        .fetchCurrencyRates()
        .then(data => setcurrencyRatesArray(data));
    }
  }, [currencyRatesArray]);

  return (
    <div className={s.App}>
      {currencyRatesArray && <Header currencyRates={currencyRatesArray} />}

      {currencyRatesArray && (
        <CurrencyConverter currencyRates={currencyRatesArray} />
      )}
    </div>
  );
};
