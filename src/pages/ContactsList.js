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
    const contactsList = useSelector((state) => state.getUsers);
    const [templates, setTemplates] = useState()
    const [example, setExample] = useState()

    // Add/Remove checked item from list
    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList)
    };

    const dispatch = useDispatch();

    useEffect(() => {

        const fetchData = async () => {
            const templ = await httpManager.getWhatsappTemplates(auth?.data?.responseData?._id)
            setTemplates(templ.data.responseData.data)
        }

        dispatch(getUsers(auth?.data?.responseData?._id))
        fetchData().catch(console.error)

    }, [dispatch])

    const SelectionTemplate = () => {

        const handleChange = event => {
            let object_name = event.target.value
            var objectToFilter = templates.filter(function (single) {
                return single.name === object_name
            });
            let temp = objectToFilter.pop();
            // console.log(temp)
            setExample(temp)
        };

        return (
            <div>
                <select onClick={handleChange} name="template" id="template-select">
                    {templates && templates.map(option => (
                        <option key={option.id} value={option.name}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>
        );
    }


    const RenderHeader = () => {

        let header;
        example && example.components.map(
            item => {
                // console.log(item.type)
                if (item.type === 'HEADER') {
                    if (item.format === 'DOCUMENT' ||
                        item.format === 'IMAGE' ||
                        item.format === 'VIDEO') {
                        header =
                            <div className="_7zeb">
                                <div className="_7r3a _7r39">
                                </div>
                            </div>
                    } else { header = null }
                }
            })
        return header
    }

    const RenderBody = () => {
        let body;
        example && example.components.map(
            item => {
                
                if (item.type === 'BODY') {
                    if (item.text) {
                      
                        body = <div className="6xdv">
                               <span className="6xe4">
                                {item.text}
                               </span>
                               </div>
                    } else { body = null }
                }
            })
        return body
    }
    
    const RenderFooter = () => {
        let footer;
        example && example.components.map(
            item => {
                if (item.type === 'FOOTER')
                {
                    if(item.text) {
                        footer =  <div className="_7qiw" dir="auto">
                                    {item.text}
                                 </div>
                    } else {footer = null}

                }
            })

        return footer;
    }

    const RenderButtons = () => {
        let buttons_array;
        example && example.components.map(
            item => {
                if(item.type == 'BUTTONS')
                {
                    if(item.buttons){
                        buttons_array = <div className="buttons_type">
                                        {
                                        item.buttons.map(item => {
                                         return <div className="internal__button">
                                                <span>{item.text}</span>
                                                 </div>
                                        })
                                        }
                                        </div>
                    } else {buttons_array=null}
                }
            })
        return buttons_array;
    }

    const SendMessage = async () => {
        // retrieve tokens 
        const saved = localStorage.getItem("whatsapp_app");
        if (!saved) { alert('insertar tokens primero'); return }
        const configs = JSON.parse(saved);
        const tokenId = configs.token;
        const numberId = configs.phoneId
        // treat the whole array with data
        const sendArrayMessage = async (item) => {
            const obj = JSON.parse(item)
            const msgReqData = {
                name: obj.name,
                from: auth?.data?.responseData?.phoneNumber,
                to: obj.phoneNumber,
                type: "text",
                message: "bussiness_initiated_message",
                addedOn: new Date().getTime(),
                senderID: 0,
                isRead: false,
            }
            // create data in case to create a channel conversation
            const channelUsers = [{
                name: obj.name,
                phoneNumber: obj.phoneNumber,
                userId: obj._id
            }, {
                name: auth?.data?.responseData?.lastName,
                phoneNumber: auth?.data?.responseData?.phoneNumber,
                userId: auth?.data?.responseData?._id,
            }];
            await httpManager.sendBusinessMessage({
                channelUsers,
                tokenId,
                numberId,
                messages: msgReqData
            })
            //console.log(msgReqData)
        }
        checked.forEach(sendArrayMessage)
    }


    return (
        <div className="container-x1">
            {/* <MyForm/> */}
            {openForm ? <MyForm closeForm={setOpenForm} /> :
                // {openModal ? <Modal closeModal = {setOpenModal}/> :
                <div className="table-responsive">
                    {/* small section to draw example message: Do it to generate automatique component */}
                    <div className="external">
                        <div className='chat__body'>
                            <div className="_6xe3">
                                <div className="_70ru">
                                    <RenderHeader />
                                    <RenderBody/>
                                    <RenderFooter/>
                                </div> 
                            </div>           
                                <RenderButtons/>
                        </div>
                        <div className="template__edit">hola</div>
                    </div>
                    {/* end small section to draw example message */}
                    <div className="table-wrapper">
                        <div className="table-title">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h2>Start your first Business Message</h2>
                                </div>
                                <br />
                                <SelectionTemplate />
                                <div className="col-sm-6">
                                    <Button
                                        //className="sendBtn"
                                        variant="contained"
                                        onClick={SendMessage}
                                        startIcon={<Send />}
                                    >
                                        Start Message
                                    </Button>
                                    <Button
                                        className="openModalBtn"
                                        variant="contained"
                                        onClick={() => { setOpenForm(true) }}
                                        startIcon={<AddCircleOutlineOutlined />}
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
                                            <td><input value={[`{"_id":"${contact._id}", "name": "${contact.name}", "phoneNumber":"${contact.phoneNumber}"}`]} type="checkbox" onChange={handleCheck} /></td>
                                            <Contacts contact={contact} />
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