import {  IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { DeleteForever } from '@material-ui/icons';


const Contacts = ({contact}) => {
    return (
        <>
            <td>{contact.name}</td>
            <td>{contact.email}</td>
            {/* <td>{contact.address}</td> */}
            <td>{contact.phoneNumber}</td>
            <td>
            <a href="#editEmployeeModal" className="edit" data-toggle="modal">
            <IconButton>
             <EditIcon/>
            </IconButton>
            </a>

            <a href="#deleteEmployeeModal" className="delete" data-toggle="modal">
            <IconButton>
             <DeleteForever/>
            </IconButton>
            </a>
                {/* <a href="#editEmployeeModal" className="edit" data-toggle="modal">
                    <i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;
                    </i>
                </a> */}
                {/* <a href="#deleteEmployeeModal" className="delete" data-toggle="modal">
                    <i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;
                    </i>
                </a> */}
            </td>
        </>
    )
}

export default Contacts;