import React, {useContext} from "react";
import PropTypes from "prop-types";
import ContactContext from "../../context/contact/contactContext"

const ContactItem = ({ contact }) => {
  const {_id, name, email, phone, type } = contact;
  
  const {deleteContact, setCurrent, clearCurrent} = useContext(ContactContext);
  
  const onDelete = () => { 
    deleteContact(_id)
    clearCurrent();
  }
  const onEdit = () => setCurrent(contact)
  
  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{" "}
        <span 
          style={{float: 'right'}}
          className={
            "badge " + (type === "personal" ? "badge-primary" : "badge-success")
          }
        >{type.charAt(0).toUpperCase() + type.slice(1,)}</span>
      </h3>
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open" /> {email}
          </li>
        )}
        {email && (
          <li>
            <i className="fas fa-phone" /> {phone}
          </li>
        )}
      </ul>
      <p>
        <button 
          className="btn btn-dark btn-sm" 
          onClick={onEdit}
        >Edit</button>
        <button 
          className="btn btn-danger btn-sm" 
          onClick={onDelete}
        >Delete</button>
      </p>
    </div>
  );
};
ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
}
export default ContactItem;