import React from 'react';
import CurrencyItem from '../CurrencyItem';
import s from './Header.module.css';


export default function Header({currencyRates}) {
    console.log('rates', currencyRates);
    return (<>
        <header className={s.header}>
            <ul className={s.list}>
                {currencyRates.map(currency => (
                    <CurrencyItem key={currency.ccy}  item={currency} />
                ))}
            </ul>
        </header>
    </>)
}