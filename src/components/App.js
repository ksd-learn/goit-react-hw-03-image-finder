import { Component } from "react";
import { ContactForm } from './contactForm/ContactForm';
import { Filter } from './filter/Filter';
import { ContactList } from './contactList/ContactList';
import { nanoid } from "nanoid";
import css from './App.module.css'

export class App extends Component {

  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  };

  addContact = (userData) => {
      const newUser = { ...userData, id: nanoid() };
      this.setState(
        (prevstate) => {
          return { contacts: [...prevstate.contacts, newUser] }
        }
      )
  };
  
  deleteContacts = (id) => {
    this.setState((prevstate) => {
      return { contacts: prevstate.contacts.filter((user) => user.id !== id) }
    })
  };
  
  handleChangeFilter = ({ target: { value } }) => {
    this.setState({
      filter: value
    })
  };

  filterContact = (name, filter) => {
    let nameLow = name.toLocaleLowerCase();
    let filterLow = filter.toLocaleLowerCase();
    return (nameLow.indexOf(filterLow) >= 0)
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('phonebook', JSON.stringify(this.state.contacts))
    }
  }

  componentDidMount() {
    const book = localStorage.getItem('phonebook');
    if (book) {
      const parsePhonebook = JSON.parse(book);
      this.setState({contacts: parsePhonebook})
    }
  }
  
  render() {

    const { contacts, filter } = this.state;
    const contactSeach = contacts.filter((user) => this.filterContact(user.name, filter));
    const namesContact = contacts.map(user => user.name);

    return (
      <div className={css.phonebook}>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} namesContact={namesContact} />

        <h2>Contacts</h2>
        <Filter handleChangeFilter={this.handleChangeFilter} filter={filter} />
        <ContactList contactSeach={contactSeach} deleteContacts={this.deleteContacts} />
      </div>
    );
  }
}
