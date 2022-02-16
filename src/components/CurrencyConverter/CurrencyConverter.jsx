import React, {  useState, useEffect } from 'react';
import s from './CurrencyConverter.module.css';

export default function CurrencyConverter({currencyRates}) {
  const [firstCurrencyValue, setFirstCurrencyValue] = useState(100);
  const [firstCurrencyName, setFirstCurrencyName] = useState('USD');

  const [secondCurrencyValue, setSecondCurrencyValue] = useState(100);
  const [secondCurrencyName, setSecondCurrencyName] = useState('UAH');

  const [flag, setFlag] = useState('first');

  const firstCurrentCurrencyObj = currencyRates.find(currency => currency.ccy === firstCurrencyName);
  const secondCurrentCurrencyObj = currencyRates.find(currency => currency.ccy === secondCurrencyName);

  const exchangeRate = () => (parseFloat(firstCurrentCurrencyObj.buy) / parseFloat(secondCurrentCurrencyObj.sale)).toFixed(4);
  const reverseExchangeRate = () => (parseFloat(secondCurrentCurrencyObj.sale) / parseFloat(firstCurrentCurrencyObj.buy)).toFixed(4);

  useEffect(() => {
    if (currencyRates.length !== 0 && flag !== 'second') {
      console.log('flag', flag);
      const secondValue = (firstCurrencyValue * parseFloat(firstCurrentCurrencyObj.buy) / parseFloat(secondCurrentCurrencyObj.sale)).toFixed(2);
      secondValue !== secondCurrencyValue && setSecondCurrencyValue(secondValue);      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstCurrencyValue, firstCurrencyName, currencyRates]);

  useEffect(() => {
    if (currencyRates.length !== 0 && flag !== 'first') {
      console.log('flag', flag);
      const firstValue = (secondCurrencyValue * parseFloat(secondCurrentCurrencyObj.sale) / parseFloat(firstCurrentCurrencyObj.buy)).toFixed(2);
      firstValue !== firstCurrencyValue && setFirstCurrencyValue(firstValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondCurrencyValue, secondCurrencyName, currencyRates]);

  const onChangeFirstValue = (e) => {
    setFlag('first');
    setFirstCurrencyValue(e.currentTarget.value);
  }
  const onChangeSecondValue = (e) => {
    setFlag('second');
    setSecondCurrencyValue(e.currentTarget.value)
  };

  const onChangeFirstCurrencyName = (e) => {
    setFlag('first');
    setFirstCurrencyName(e.currentTarget.value);
  };

    const onChangeSecondCurrencyName = (e) => {
    setFlag('second');
    setSecondCurrencyName(e.currentTarget.value);
  };



  return (
    currencyRates.length !== 0 && <section>
      <div className={s.currencyBlock}>
        <p>Want to SALE</p>
        <div className={s.inputBlock}>
          <input type="text" value={firstCurrencyValue} onChange={onChangeFirstValue} />
          <select
            size='1'
            id="firstSelect"
            defaultValue={firstCurrencyName}
            onChange={onChangeFirstCurrencyName}
          >
            {currencyRates.map(currency => (
              <option
                key={currency.ccy}
                value={currency.ccy}
              >{currency.ccy}</option>
            ))}
          </select>
        </div>
        <p>1 {firstCurrencyName} = {exchangeRate()} {secondCurrencyName}</p>
      </div>

      <div className={s.currencyBlock}>
        <p>Want to BUY</p>
        <div className={s.inputBlock}>
          <input type="text" value={secondCurrencyValue} onChange={onChangeSecondValue} />
          <select
            size='1'
            id="secondSelect"
            defaultValue={secondCurrencyName}
            onChange={onChangeSecondCurrencyName}
          >
            {currencyRates.map(currency => (
              <option
                key={currency.ccy}
                value={currency.ccy}
              >{currency.ccy}</option>
            ))}
          </select>
        </div>
        <p>1 {secondCurrencyName} = {reverseExchangeRate()} {firstCurrencyName}</p>
      </div>
    </section>
  );
};