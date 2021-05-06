import React, { Fragment, useContext, useEffect } from "react";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import ContactItem from "./ContactItem";
import ContactContext from "../../context/contact/contactContext";
import Spinner from "../layout/Spinner";

const Contacts = props => {
  const { contacts, filtered, getContacts, loading } = useContext(ContactContext);
  //eslint-disable-next-line
  useEffect(() => getContacts(), [])
  
  if (contacts !== null && contacts.length === 0 && !loading) 
    return <h4>Please add a contact</h4>
  
  const oneOfTwo = filtered ? filtered : contacts;
  
  return (
    <Fragment>
      {contacts !== null && !loading 
        ? (
          <TransitionGroup>
            {oneOfTwo.map(contact => (
              <CSSTransition key={contact._id} timeout={500} classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
            ))}
          </TransitionGroup>) 
        : <Spinner />}
      
    </Fragment>
  );
};

export default Contacts;