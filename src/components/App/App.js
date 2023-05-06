import React, { Component } from "react";
import { GlobalStyle } from "./GlobalStyle";
import { ContactForm } from "components/ContactForm/ContactForm";
import { ContactList } from "components/ContactList/ContactList";
import { Filter } from "components/Filter/Filter";
import { Section } from "components/Section/Section";
import { Header } from "components/Header/Header";
import { Container } from "components/Container/Container"


import initialContacts from "data/contacts.json";




export default class App extends Component {
 
state = {
  contacts: initialContacts,
  filter: '',
};

addContact = newContact => {
   this.state.contacts.some( contact =>
     contact.name.toLowerCase().trim() === newContact.name.trim() ||
     contact.number.trim() === newContact.number.trim()
     )
     ? alert(`${newContact.name} is already in contacts.`)
     : this.setState(prevState => {
       return {
         contacts: [newContact, ...prevState.contacts],
       };
    })
};

changeFilter = event => {
  this.setState({ filter: event.currentTarget.value.toLowerCase() });
};

deleteContact = contactId => {
  this.setState(prevState => {
    return {
      contacts: prevState.contacts.filter(
        contact => contact.id !== contactId
      )
    };
  })
};

getFiltredContacts = () => {
  const { filter, contacts } = this.state;
  
  return contacts.filter(contact => 
    contact.name.toLowerCase().includes(filter.toLowerCase())
  )

};

 render() {
  const { filter } = this.state;
  const filtredContacts = this.getFiltredContacts();

  return (
    <Container>
            <Section title="Phonebook" >
              <ContactForm onAddContact={this.addContact}/>
              <Header title="Contacts"/>
              <Filter value={filter} onChange={this.changeFilter} />
              <ContactList contacts={filtredContacts} onDelete={this.deleteContact}/>
            </Section>
      <GlobalStyle />
    </Container>
  );
};

};

