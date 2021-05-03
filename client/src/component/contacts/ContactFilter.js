import React, {useContext, useRef, useEffect} from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactFilter = (props) => {
  const { filterContacts, clearFilter, filtered } = useContext(ContactContext);
  
  const text = useRef('');
  
  useEffect(() => {
    if (!filtered) text.current.value = ''
  })
  
  const onChange = e => {
    text.current.value !== '' 
        ? filterContacts(e.target.value)
        : clearFilter()
  }
  
  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Filter Contacts..."
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;
