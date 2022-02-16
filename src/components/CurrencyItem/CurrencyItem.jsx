import React from 'react';
import { transformNumber } from '../../api';
import s from './CurrencyItem.module.css';

const CurrencyItem = ({ item }) => {
    const transformedItem = transformNumber(item);
    return <li className={s.item}>{item.ccy} : {transformedItem.buy}/{transformedItem.sale}</li>
}

export default CurrencyItem;

 