import React, {useContext, useEffect} from 'react';
import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";
import ContactFilter from "../contacts/ContactFilter";
import AuthContext from "../../context/auth/authContext";

const Home = (props) => {
  const { loadUser } = useContext(AuthContext);
  
  //eslint-disable-next-line
  useEffect(() => loadUser(), [])
  
  return (
      <div className="grid-2">
        <div><ContactForm /></div>
        <div>
          <ContactFilter />
          <Contacts />
        </div>
      </div>
  );
}

export default Home;