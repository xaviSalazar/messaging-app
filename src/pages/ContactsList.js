import Contacts from "./Contact";
import './ContactsList.css'
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { getUsers } from '../redux/GetUsers/UsersAction';

const ContactsList = () => {

    const dispatch = useDispatch();
    useEffect( ()=>{
            console.log("useeffect CONTACTS LIS js")
            dispatch(getUsers("eltia"))
          }, [dispatch])

    const contactsList  = useSelector((state) => state.getUsers);

    return (
        <div className="container-x1">
            <div className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-6">
                                <h2>Edit <b>Contacts</b></h2>
                            </div>
                            <div className="col-sm-6">
                                <button
                                    className="openModalBtn"
                                >
                                    Add new contact
                                    </button>
                                {/* <a href="#addEmployeeModal" className="btn btn-success" data-toggle="modal">
                                    <i className="material-icons">&#xE147;</i> 
                                    <span>Add New Employee</span>
                                </a> */}
                            </div>
                        </div>
                    </div>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                                 <th>Email</th>
                                {/*<th>Address</th> */}
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                                {
                                    contactsList.map(contact => (
                                        <tr key={contact._id}>
                                            <Contacts contact={contact}/>
                                        </tr>
                                    ))
                                }
                    
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ContactsList;