import Contacts from "./Contact";
import './ContactsList.css'
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { getUsers } from '../redux/GetUsers/UsersAction';
import { MyForm } from "../components/ContactModal/Modal";
//import MyForm from "../components/ContactModal/Modal";
import { httpManager } from '../managers/httpManager';
import { Button } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import { AddCircleOutlineOutlined } from "@material-ui/icons";


const ContactsList = () => {

    let auth = useSelector(state => state.customerReducer.auth)
    //const [openModal, setOpenModal] = useState(false)
    const [openForm, setOpenForm] = useState(false)
    // track checked items
    const [checked, setChecked] = useState([]);

    // Add/Remove checked item from list
    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
        updatedList = [...checked, event.target.value];
        console.log(updatedList)
        } else {
        updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList)
    };

    const dispatch = useDispatch();
    useEffect( ()=>{
            console.log("useeffect CONTACTS LIS js")
            dispatch(getUsers(auth?.data?.responseData?._id))
          }, [dispatch])

    const contactsList  = useSelector((state) => state.getUsers);

    const SendMessage = async () => {

        let phone = checked.pop()
        console.log(phone);

        if(typeof phone === 'undefined') return;

        const msgReqData ={
            name: "DefaultUser",
            mensaje: "prueba",
            to: phone,
            from: "15550900270",
            addedOn: new Date().getTime(),
            senderID: 0
        };

        await httpManager.sendBusinessMessage({
                    messages: msgReqData
                })
    }

    return (
        <div className="container-x1">
            {/* <MyForm/> */}

            {openForm ? <MyForm closeForm = {setOpenForm}/> :
            // {openModal ? <Modal closeModal = {setOpenModal}/> :

            <div className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-6">
                                <h2>Start your first Business Message</h2>
                            </div>
                            <br/>
                            <div className="col-sm-6">
                                <Button
                                    //className="sendBtn"
                                    variant="contained"
                                    onClick={SendMessage}
                                    startIcon={<Send/>}
                                >
                                    Start Message 
                                </Button>
                                <Button
                                    className="openModalBtn"
                                    variant="contained"
                                    onClick={() => {setOpenForm(true)}}
                                    startIcon={<AddCircleOutlineOutlined/>}
                                >
                                    Add new contact
                                </Button>
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
                                <th>Select Item</th>
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
                                            <td><input value={contact.phoneNumber} type="checkbox" onChange={handleCheck} /></td>
                                            <Contacts contact={contact}/>
                                        </tr>
                                    ))
                                }
                    
                        </tbody>
                    </table>
                </div>
            </div>
            }
            
        </div>
    )
}

export default ContactsList;