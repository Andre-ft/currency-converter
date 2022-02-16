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
        // parsedContacts.map(({ name, number }) => addContact({ name, number }));
        setcurrencyRatesArray(parsedRatesArray);
        return;
      }

      // setcurrencyRatesArray(currencyRatesAPI.fetchCurrencyRates());
      currencyRatesAPI
        .fetchCurrencyRates()
        .then(data => setcurrencyRatesArray(data));
    }
    // localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [currencyRatesArray]);

  // const [contacts, setContacts] = useState([]);
  // const [filter, setFilter] = useState('');

  // вместо useEffect используем persist
  /*useEffect(() => {
    if (!contacts.length) {
      const savedContacts = localStorage.getItem('contacts');
      const parsedContacts = JSON.parse(savedContacts);

      if (parsedContacts) {
        parsedContacts.map(({ name, number }) => addContact({ name, number }));
        // setContacts(parsedContacts);
      }
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
}, [contacts]);
  */

  // const addContact = ({ name, number }) => {
  //   const contact = {
  //     id: shortid.generate(),
  //     name,
  //     number,
  //   };

  //   setContacts([contact, ...contacts]);
  // };
  /*
  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };
*/

  // const deleteContact = contactId => {
  //   const newContacts = contacts.filter(contact => contact.id !== contactId);
  //   setContacts(newContacts);
  // };

  // const visibleContacts = getVisibleContacts();

  return (
    <div className={s.App}>
      {currencyRatesArray && <Header currencyRates={currencyRatesArray} />}

      <h1>Currency Converter</h1>
      {currencyRatesArray && (
        <CurrencyConverter currencyRates={currencyRatesArray} />
      )}
    </div>
  );
};

// export default App;

// const mapStateToProps = state => ({
//   contacts: state.contacts.items,
//   filter: state.contacts.filter,
// });

// const mapDispatchToProps = dispatch => ({
//   addContact: ({ name, number }) =>
//     dispatch(actions.addContact({ name, number })),
//   deleteContact: () => dispatch(actions.deleteContact()),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(App);
