import React from "react";
import s from './CurrencyBlock.module.css';

export default function CurrencyBlock({
    currencyRates,
    currencyValue,
    onChangeValue,
    firstCurrencyName,
    exchangeRate,
    secondCurrencyName,
    onChangeCurrencyName,
    defaultValue,
    headerText,
}) { return (
        currencyRates.length !== 0 && <div className={s.currencyBlock}>
            <p className={s.blockHeader}>{headerText}</p>
            <div className={s.inputBlock}>
                {/* <form name='currencyForm'> */}
                    <input name='input' type="text" value={currencyValue} onChange={onChangeValue} />
                    <select
                        name='select'
                        id='select'
                        size='1'
                        defaultValue={firstCurrencyName}
                        onChange={onChangeCurrencyName}
                    >
                        {currencyRates.map(currency => (
                            <option
                                key={currency.ccy}
                                value={currency.ccy}
                            >{currency.ccy}</option>
                        ))}
                    </select>
                {/* </form> */}
            </div>
            <p className={s.uniteRate}>1 {firstCurrencyName} = {exchangeRate()} {secondCurrencyName}</p>
        </div>
    );
};
