import { React,useState } from "react";
const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick,isChecked, setisChecked, checkAll}) => {
  // const [checkAll2, setCheckAll2]=useState(true);
  const handlecheckbox = (e)=>{
    const {value, checked}= e.target;
    if(checked)
    {
      setisChecked([...isChecked, value]);
    } else{
      setisChecked(isChecked.filter( (e)=>e!== value));
    }
  }
  
  return (
    <tr>
      {checkAll ?
    <td><input className="checkbox" type='checkbox' value={JSON.stringify(contact)} checked={checkAll} /></td>  
    :
      <td><input className="checkbox" type="checkbox" value={JSON.stringify(contact)} checked={contact.isChecked} onChange={(e)=>handlecheckbox(e)} /></td>  
   }
      <td>{contact.Asunto}</td>
      <td>{contact.Apellidos}</td>
      <td>{contact.Nombres}</td>
      <td>{contact['Lugar de Trabajo']}</td>
      <td>{contact.Email}</td>
      <td>{contact.Celular}</td>
      <td>{contact.Direccion}</td>
      <td>{contact.Notas}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(contact.__rowNum__)}>
          Delete
        </button>

      </td>
    </tr>
  );
};

export default ReadOnlyRow;
