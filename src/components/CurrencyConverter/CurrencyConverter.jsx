import React, {  useState, useEffect } from 'react';
import s from './CurrencyConverter.module.css';
import CurrencyBlock from '../CurrencyBlock';

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
      const secondValue = (firstCurrencyValue * parseFloat(firstCurrentCurrencyObj.buy) / parseFloat(secondCurrentCurrencyObj.sale)).toFixed(2);
      secondValue !== secondCurrencyValue && setSecondCurrencyValue(secondValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstCurrencyValue, firstCurrencyName, currencyRates]);

  useEffect(() => {
    if (currencyRates.length !== 0 && flag !== 'first') {
      const firstValue = (secondCurrencyValue * parseFloat(secondCurrentCurrencyObj.sale) / parseFloat(firstCurrentCurrencyObj.buy)).toFixed(2);
      firstValue !== firstCurrencyValue && setFirstCurrencyValue(firstValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondCurrencyValue, secondCurrencyName, currencyRates, flag]);

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

  // const onSwap = () => {
  //   // const temporaryValue = firstCurrencyValue;
  //   const temporaryName = firstCurrencyName;
  //   const temporaryValue = firstCurrencyValue;
  //   // setFlag('first');
  //   setFirstCurrencyValue(secondCurrencyValue);
  //   setFirstCurrencyName(secondCurrencyName);
  //   // setFlag('second');
  //   setSecondCurrencyValue(temporaryValue);
  //   setSecondCurrencyName(temporaryName);
  //   console.log('firstCurrencyName', firstCurrencyName);
  //   console.log('secondCurrencyName', secondCurrencyName);

  // }

  return (
    <main>
      <h1>Currency Converter</h1>
      {currencyRates.length !== 0 && <section>
        <CurrencyBlock
          currencyRates={currencyRates}
          currencyValue={firstCurrencyValue}
          onChangeValue={onChangeFirstValue}
          onChangeCurrencyName={onChangeFirstCurrencyName}
          exchangeRate={exchangeRate}
          firstCurrencyName={firstCurrencyName}
          secondCurrencyName={secondCurrencyName}
          defaultValue={firstCurrencyName}
          headerText={'I want to sale'}
        />

        {/* <button type='button' className={s.swapButton} onClick={onSwap}>SWAP</button> */}
        
        <CurrencyBlock
          currencyRates={currencyRates}
          currencyValue={secondCurrencyValue}
          onChangeValue={onChangeSecondValue}
          onChangeCurrencyName={onChangeSecondCurrencyName}
          exchangeRate={reverseExchangeRate}
          firstCurrencyName={secondCurrencyName}
          secondCurrencyName={firstCurrencyName}
          defaultValue={secondCurrencyName}
          headerText={'I want to buy'}
        />
      </section>}
    </main>
  )
};