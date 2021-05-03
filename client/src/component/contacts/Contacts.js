import React, { Fragment, useContext } from "react";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import ContactItem from "./ContactItem";
import ContactContext from "../../context/contact/contactContext";

const Contacts = (props) => {
  const { contacts, filtered } = useContext(ContactContext);

  if (contacts.length === 0) return <h4>Please add a contact</h4>
  
  const oneOfTwo = filtered ? filtered : contacts;
  
  return (
    <Fragment>
      <TransitionGroup>
        {oneOfTwo.map((contact) => (
            <CSSTransition key={contact.id} timeout={500} classNames="item">
              <ContactItem contact={contact} />
            </CSSTransition>
        ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Contacts;