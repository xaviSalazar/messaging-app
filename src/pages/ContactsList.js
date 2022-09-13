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
import reactStringReplace from 'react-string-replace';


// template initial state
// Note: Do not put unnecessary elements in components
const initialState = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: "PHONE_NUMBER",
    type: "template",
    template: {
      name: "TEMPLATE_NAME",
      language: {
        code: "LANGUAGE_AND_LOCALE_CODE"
      },
    components: []
    }
}

const ContactsList = () => {
    let auth = useSelector(state => state.customerReducer.auth)
    //const [openModal, setOpenModal] = useState(false)
    const [openForm, setOpenForm] = useState(false)
    // track checked items
    const [checked, setChecked] = useState([]);
    const contactsList = useSelector((state) => state.getUsers);
    const [templates, setTemplates] = useState()
    const [example, setExample] = useState()
    const [initConvTemplate, setInitConvTemplate] = useState(initialState);
    const [detailTemplate, setDetailTemplate] = useState()
    const dispatch = useDispatch();

    const buildBusinessPayload = (payload) => {
        const variable = {...initConvTemplate}
        //console.log(variable)
        variable['template']['language']['code'] = payload.language                
        variable['template']['name'] = payload.name
        const componentes = []
        function buildComponents(item, index, arr) {
            if(item.type === 'HEADER') {
                if (item.format === 'DOCUMENT' ||
                        item.format === 'IMAGE' ||
                        item.format === 'VIDEO') {
                            const type_doc = item.format.toLowerCase();
                            const header = {type: item.type.toLowerCase(),}
                            const parameters = []
                            const listing_parameters = {type: item.format.toLowerCase(),}
                            listing_parameters[type_doc] = {link: ""}
                            parameters.push(listing_parameters)
                            header['parameters'] = parameters
                            componentes.push(header);
                        } 
                        //      else if (item.format === 'TEXT') {
                        //     const type_doc = item.format.toLowerCase();
                        //     const header = {type: item.type.toLowerCase(),}
                        //     const parameters = []
                        //     const listing_parameters ={type: item.format.toLowerCase(),}
                        //     listing_parameters[type_doc] = item.text
                        //     parameters.push(listing_parameters)
                        //     header['parameters'] = parameters
                        //     componentes.push(header);
                        // }
            } else if(item.type === 'BODY') {
                // verify if i need to send variables
                let regVar = /{{(\d+)}}/g
                if(regVar.test(item.text)) {
                const body = {type: item.type.toLowerCase(),}
                const parameters = []
                const listing_parameters = {type: "text", text: item.text}
                parameters.push(listing_parameters)
                body['parameters'] = parameters
                componentes.push(body);
                }
            } else if(item.type === 'BUTTONS') {

            }
        }
        variable['template']['components'] = componentes
        payload.components.forEach(buildComponents)
        console.log(variable)
        setInitConvTemplate(variable)
    }

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

    useEffect(() => {
        const fetchData = async () => {
            const templ = await httpManager.getWhatsappTemplates(auth?.data?.responseData?._id)
            const loaded_templates = templ.data.responseData.data.filter(item => item.status === 'APPROVED').map(item => item)
            setTemplates(loaded_templates)
        }
        dispatch(getUsers(auth?.data?.responseData?._id))
        fetchData().catch(console.error)
    }, [dispatch, auth?.data?.responseData?._id])

    const [valueSelect, setValueSelect] = useState()

    const SelectionTemplate = () => {
        const handleChange = event => {
            let object_name = event.target.value
            setValueSelect(event.target.value)
            var objectToFilter = templates.filter(function (single) {
                return single.name === object_name
            });
            let temp = objectToFilter.pop();
            setExample(temp)
            setDetailTemplate(temp)
            console.log(temp)
            buildBusinessPayload(temp);
        };

        return (
            <div>
                {templates && <select onChange={handleChange} value={valueSelect} name="template" id="template-select">
                    {templates && templates.map((option,index) => (
                        <option key={index} value={option.name}>
                            {option.name}
                        </option>
                    ))}
                </select>}
            </div>
        );
    }

    const RenderHeader = () => {
        let header;
        example && example.components.map(
            (item,index) => {
                if (item.type === 'HEADER') {
                    if (item.format === 'DOCUMENT' ||
                        item.format === 'IMAGE' ||
                        item.format === 'VIDEO') {
                        header =
                            <div key = {index} className="_7zeb">
                                <div className="_7r3a _7r39">
                                </div>
                            </div>
                    } else { header = null }
                }
                return header
            })
        return header
    }

    const [instante, setInstante] = useState()
    
    const handleLink = (e, format) => {
        // use lowercase here
        const {value} = e.target
        console.log(value)
        // handling other comp to send
        const example_template = {...detailTemplate} 
        const new_example_template = example_template['components'].map(p =>
            p.type==="HEADER"
            ? {...p, example: value} : p);
        example_template['components'] = new_example_template
        setDetailTemplate(example_template)
        console.log(example_template)

        const variable = {...initConvTemplate}
        const new_comp = variable['template']['components'].map(p=> 
            p.type === "header" 
             ? {...p, parameters: [{type: format.toLowerCase(), [format.toLowerCase()]: {link: value}}]} : p );
        variable['template']['components'] = new_comp
        console.log(variable)
        setInitConvTemplate(variable)
        setInstante(value)
    }

    const [newState, setNewState] = useState([]);

    const handleArrayInput = (e, i, mapArray) => {
        const {value} = e.target
        // take table from memory
        var table = [...newState]
        table[i] = value
        // save to memory 
        setNewState(table)
        console.log(table)
        const nueva = table.filter(item => typeof item !== 'undefined').map((item, index) => (
            {type: "text", text:item} 
        ))
        // hold latest value 
        mapArray[i] = value
        // copy elements
        const variable = mapArray.map((item, index) => (
            typeof item === 'object' ? table[index] : item
        ))

        // join all words into single text
        let text_joined = variable.join("")
        const example_template = {...detailTemplate} 
        const new_example_template = example_template['components'].map(p =>
            p.type==="BODY"
            ? {...p, text: text_joined} : p);
        example_template['components'] = new_example_template
        console.log(example_template)
        setDetailTemplate(example_template)
        // setExample(example_template)

        const older_template = {...initConvTemplate}
        const new_comp = older_template['template']['components'].map(p=> 
            p.type === "body" 
             ? {...p, parameters: nueva} : p );
        older_template['template']['components'] = new_comp
        setInitConvTemplate(older_template)
        console.log(older_template)
    }

    const EditParametersTemplate = example && example.components.map(
            (item,index) => {
                if (item.type === 'HEADER') {
                    if (item.format === 'DOCUMENT' ||
                        item.format === 'IMAGE' ||
                        item.format === 'VIDEO') {
                        return <label key={index}>{`${item.format}: `}<input type="text" value={instante} name="data" onChange={(e) => handleLink(e, item.format)}/></label>
                    } else { return null }
                }
                if (item.type === 'BODY') {
                     const mapArray = reactStringReplace(item.text,/{{(\d+)}}/g, (match, i) => {
                         return <input type="text" value={newState[i]} onChange={(e) => handleArrayInput(e, i, mapArray)}/>
                     })
                     return <div> {mapArray} </div>;
                }
            }
    )

    const RenderBody = () => {
        let body;
        detailTemplate && detailTemplate.components.map(
            (item, index) => {  
                if (item.type === 'BODY') {
                    if (item.text) {
                        body = <div key={index} className="6xdv">
                               <span className="6xe4">
                                {item.text}
                               </span>
                               </div>
                    } else { body = null }
                }
                return body
            })
        return body
    }
    
    const RenderFooter = () => {
        let footer;
        example && example.components.map(
            (item,index) => {
                if (item.type === 'FOOTER')
                {
                    if(item.text) {
                        footer =  <div key={index} className="_7qiw" dir="auto">
                                    {item.text}
                                 </div>
                    } else {footer = null}

                }
                return footer;
            })

        return footer;
    }

    const RenderButtons = () => {
        let buttons_array;
        example && example.components.map(
            item => {
                if(item.type === 'BUTTONS')
                {
                    if(item.buttons){
                        buttons_array =  <div className="buttons_type">
                                        {
                                        item.buttons.map((item,index) => {
                                         return <div key={index} className="internal__button">
                                                <span>{item.text}</span>
                                                 </div>
                                        })
                                        }
                                        </div>
                    } else {buttons_array=null}
                }
                return buttons_array;
            })
            return buttons_array;
    }

    const SendMessage = async () => {
        // retrieve tokens 
        const saved = localStorage.getItem("whatsapp_app");
        if (!saved) { alert('insertar tokens primero'); return }
        const configs = JSON.parse(saved);
        const tokenId = configs.token;
        const numberId = configs.phoneNumberId
        // change phone number in msg template
        // treat the whole array with data
        const bsn_msg = {...initConvTemplate}
       
        console.log(bsn_msg)
        const sendArrayMessage = async (item) => {
            // array with list of recipients
            const obj = JSON.parse(item)
            // edit template to send with different number
            bsn_msg['to'] = obj.phoneNumber
            const msgReqData = {
                name: obj.name,
                from: numberId,
                to: obj.phoneNumber,
                type: "template",
                template: bsn_msg,
                components: detailTemplate.components,
                message: "business_message",
                addedOn: new Date().getTime(),
                senderID: 0,
                isRead: false,
            }
            console.log(msgReqData)
            // create data in case to create a channel conversation
            const channelUsers = [{
                name: obj.name,
                phoneNumber: obj.phoneNumber,
                userId: obj._id
            }, {
                name: auth?.data?.responseData?.lastName,
                phoneNumber: numberId,
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
                        <div className='chat__preview'>
                            <div className="_6xe3">
                                <div className="_70ru">
                                    <RenderHeader />
                                    <RenderBody/>
                                    <RenderFooter/>
                                </div> 
                            </div>           
                                <RenderButtons/>
                        </div>
                        <div className="template__edit">{EditParametersTemplate}</div>
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