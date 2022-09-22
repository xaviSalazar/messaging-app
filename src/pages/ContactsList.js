import Contacts from "./Contact";
import './ContactsList.css'
import { nanoid } from "nanoid";
import { useState, useEffect, Fragment } from "react";
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
import { LoadFiles } from "../components/LoadFiles/LoadFiles";
import {ImportCSV} from "../components/ContactsList/ImportCSV";
import AddContact from "../components/ContactsList/AddContact";
import {ExportCSV} from "../components/ContactsList/ExportCSV";
import EditableRow from "../components/ContactsList/EditableRow";
import ReadOnlyRow from "../components/ContactsList/ReadOnlyRow";
import ReactPaginate from "react-paginate";
import { createUser } from "../api";


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
    const usersPerPage = 10;
    const [pageNumber, setPageNumber] = useState(0);
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
    const [file, setFile] = useState()
    // contacts handle
    const [contacts, setContacts] = useState([]);
    const [importToggle, setImportToggle] = useState(false);
    const [contactToggle, setContactToggle] = useState(false);
    const dispatch = useDispatch();
    const [editContactId, setEditContactId] = useState(null);
    const [checkAll, setCheckAll]=useState(false);
    const [isChecked, setisChecked]= useState([]);


    useEffect(() => {
    
      const newTranslation = contactsList.map(item => {
        return {
          'Asunto': item.asunto,
          'Apellidos': item.lastname,
          'Nombres': item.name,
          'Lugar de Trabajo': item.workplace,
          'Email': item.email,
          'Celular': item.phoneNumber,
          'Direccion': item.address,
          'Notas': item.notes,
          '__rowNum__': item.__rowNum__,
          '_id': item._id
          }
      });

      setContacts(newTranslation)

    }, [contactsList])
    const handleCancelClick = () => {
        setEditContactId(null);
      };

      const handlecheckbox = (e)=>{
        const {value, checked}= e.target;
        if(checked)
        {
          setisChecked(value);
        } else{
  
          setisChecked([]);
        }
      }

      const pagesVisited = pageNumber * usersPerPage;
      const pageCount = Math.ceil(contacts.length / usersPerPage);
    
      const changePage = ({ selected }) => {
        setPageNumber(selected);
      };
    

    const [addFormData, setAddFormData] = useState({
        Asunto: "",
        Apellidos: "",
        Nombres: "",
        'Lugar de Trabajo': "",
        Email: "",
        Celular: "",
        Direccion: "",
        Notas: "",
      });

      const [editFormData, setEditFormData] = useState({
        Asunto: "",
        Apellidos: "",
        Nombres: "",
        'Lugar de Trabajo': "",
        Email: "",
        Celular: "",
        Direccion: "",
        Notas: "",
      });

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
        //console.log(variable)
        setInitConvTemplate(variable)
    }

    // Add/Remove checked item from list
    const handleCheck = (event) => {
        var updatedList = [...checked];
        
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
            console.log(updatedList)
        } else {
            console.log(checked)
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        console.log(updatedList)
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

    const RenderHeader = example && example.components.map(
            (item,index) => {
                if (item.type === 'HEADER') {
                    if (item.format === 'DOCUMENT' ||
                        item.format === 'IMAGE' ||
                        item.format === 'VIDEO') {
                        
                        return  <div key = {index} className="_7zeb">
                                <div className="_7r3a _7r39">
                                {file && (
                                <a href={file.link} target="_blank" rel="noreferrer">
                                <img alt="document" src= {file.link}
                                width="200" height="200"/>
                                </a>)}

                                </div>
                            </div>
                    } else { return null }
                } else {return null} 
            })

    useEffect(() => {
        // console.log("added file")
        // console.log(file)
        // use lowercase here
        // handling other comp to send
        if(!detailTemplate) {return}
        const example_template = {...detailTemplate} 
        
        const new_example_template = example_template['components'].map(p =>
            p.type==="HEADER"
            ? {...p, example: file.link} : p);
        example_template['components'] = new_example_template
        setDetailTemplate(example_template)
        // console.log(example_template)

        const variable = {...initConvTemplate}
        const new_comp = variable['template']['components'].map(p=> 
            p.type === "header" 
             ? {...p, parameters: [{type: file.format.toLowerCase(), [file.format.toLowerCase()]: {link: file.link}}]} : p );
        variable['template']['components'] = new_comp
        // console.log(variable)
        setInitConvTemplate(variable)
    }, [file])

    const [newState, setNewState] = useState([]);

    const handleArrayInput = (e, i, mapArray) => {
        const {value} = e.target
        // take table from memory
        var table = [...newState]
        table[i] = value
        // save to memory 
        setNewState(table)
        // console.log(table)
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
        // console.log(example_template)
        setDetailTemplate(example_template)
        // setExample(example_template)

        const older_template = {...initConvTemplate}
        const new_comp = older_template['template']['components'].map(p=> 
            p.type === "body" 
             ? {...p, parameters: nueva} : p );
        older_template['template']['components'] = new_comp
        setInitConvTemplate(older_template)
        // console.log(older_template)
    }

    const EditParametersTemplate = example && example.components.map(
            (item,index) => {

                if (item.type === 'HEADER') {
                    if (item.format === 'DOCUMENT' ||
                        item.format === 'IMAGE' ||
                        item.format === 'VIDEO') {
                        return <label key={index}>{`Cargar archivo tipo ${item.format}: `} <LoadFiles setFile = {setFile} format={item.format.toLowerCase()}/> </label>
                    } else { return null }
                }

                if (item.type === 'BODY') {
                     const mapArray = reactStringReplace(item.text,/{{(\d+)}}/g, (match, i) => {
                          return <input key={i} type="text" value={newState[i] || ""} onChange={(e) => handleArrayInput(e, i, mapArray)}/>
                     })
                     return <div key="arrayEdit"> {mapArray} </div>;
                }

                return null
            }
    )

    const RenderBody = detailTemplate && detailTemplate.components.map(
            (item, index) => {  
                if (item.type === 'BODY') {
                    if (item.text) {
                        return <div key={index} className="6xdv">
                                    <span className="6xe4">
                                        {item.text}
                                    </span>
                               </div>
                    } else { return null }
                } else {return null}
            })

    const RenderFooter = example && example.components.map(
            (item,index) => {
                if (item.type === 'FOOTER')
                {
                    if(item.text) {
                        return <div key={index} className="_7qiw" dir="auto">
                                    {item.text}
                                 </div>
                    } else {return null}

                } else {return null}
            })

    const RenderButtons = example && example.components.map(
            (item, indice) => {
                if(item.type === 'BUTTONS')
                {
                    if(item.buttons){
                        return  <div key={indice} className="buttons_type">
                                        {
                                        item.buttons.map((item,index) => {
                                         return <div key={index} className="internal__button">
                                                <span>{item.text}</span>
                                                 </div>
                                        })
                                        }
                                        </div>
                    } else {return null}
                } else {return null}
            })


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
       
        // console.log(bsn_msg)
        async function sendArrayMessage(item) {
            // edit template to send with different number
            const obj = JSON.parse(item)
            console.log(obj)
            bsn_msg['to'] = obj.Celular
            const msgReqData = {
                name: obj.Nombres,
                from: numberId,
                to: obj.Celular,
                type: "template",
                template: bsn_msg,
                components: detailTemplate.components,
                message: "business_message",
                addedOn: new Date().getTime(),
                senderID: 0,
                isRead: false,
            }
            // console.log(msgReqData)
            // create data in case to create a channel conversation
            const channelUsers = [{
                name: obj.Nombres,
                phoneNumber: obj.Celular,
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
  
        isChecked.forEach(sendArrayMessage)
    }

    const handleEditClick = (event, contact) => {
        event.preventDefault();
        setEditContactId(contact.__rowNum__);
        const formValues = {
          Asunto: contact.Asunto,
          Apellidos: contact.Apellidos,
          Nombres: contact.Nombres,
          'Lugar de Trabajo': contact['Lugar de Trabajo'],
          Email: contact.Email,
          Celular: contact.Celular,
          Direccion: contact.Direccion,
          Notas: contact.Notas,
        };
        setEditFormData(formValues);
      };

    const handleDeleteClick = (contactId) => {
        console.log("row to be deleted", contactId)
        const newContacts = [...contacts];
    
        const index = contacts.findIndex((contact) => contact.__rowNum__ === contactId);
        console.log("row to be index", index)
        newContacts.splice(index, 1);
    
        setContacts(newContacts);
      };

    const handleAddFormChange = (event) => {
        event.preventDefault();    
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
    
        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;
    
        setAddFormData(newFormData);
      };

      const handleEditFormChange = (event) => {
        event.preventDefault();
    
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
    
        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;
    
        setEditFormData(newFormData);
      };

      const handleAddFormSubmit = async (event) => {
        event.preventDefault();
        const newContact = {
          Asunto: addFormData.Asunto,
          Apellidos: addFormData.Apellidos,
          Nombres: addFormData.Nombres,
          'Lugar de Trabajo': addFormData['Lugar de Trabajo'],
          Email: addFormData.Email,
          Celular: addFormData.Celular,
          Direccion: addFormData.Direccion,
          Notas: addFormData.Notas,
          __rowNum__: contacts.length
        };
        const sendDatabase = {
          'asunto': newContact.Asunto,
          'lastname': newContact.Apellidos,
          'name': newContact.Nombres,
          'workplace': newContact['Lugar de Trabajo'],
          'email': newContact.Email,
          'phoneNumber': newContact.Celular,
          'address': newContact.Direccion,
          'notes': newContact.Notas,
          'owner': auth?.data?.responseData?._id,
          '__rowNum__': newContact.__rowNum__
          }

        await createUser(sendDatabase);
        // add new contact in here
        const newContacts = [...contacts, newContact];
        setContacts(newContacts);
        setContactToggle(false);
      };

      const handleEditFormSubmit = (event) => {
        event.preventDefault();
    
        const editedContact = {
          id: editContactId,
          Asunto: editFormData.Asunto,
          Apellidos: editFormData.Apellidos,
          Nombres: editFormData.Nombres,
          'Lugar de Trabajo': editFormData['Lugar de Trabajo'],
          Email: editFormData.Email,
          Celular: editFormData.Celular,
          Direccion: editFormData.Direccion,
          Notas: editFormData.Notas,
        };
    
        const newContacts = [...contacts];
    
        const index = contacts.findIndex((contact) => contact.__rowNum__ === editContactId);
    
        newContacts[index] = editedContact;
    
        setContacts(newContacts);
        setEditContactId(null);
      };


    return (
      
        <div className="container-x1">
            <div className="table-responsive">     
            <div className="external">
                         <div className='chat__preview'>
                             <div className="_6xe3">
                                 <div className="_70ru">
                                     {RenderHeader}
                                     {RenderBody}
                                     {RenderFooter}
                                 </div> 
                             </div>           
                                 {RenderButtons}
                         </div>
                         <div className="template__edit">{EditParametersTemplate}</div>
              </div>
            <SelectionTemplate />
              <Button
                  //className="sendBtn"
                  variant="contained"
                  onClick={SendMessage}
                  startIcon={<Send />}
              >
                  Start Message
              </Button>
            <br/>
            <button onClick={() => setContactToggle(!contactToggle)}>Add Contact</button>
            <ExportCSV contacts={contacts} fileName="Exported Contacts" />
            {!importToggle?  <button onClick={() => setImportToggle(!importToggle)}>Import</button>:
            <button id="cancel" className="cancelBtn" onClick={() => setImportToggle(!importToggle)}>Cancel</button>}
            {importToggle ? <ImportCSV setContacts={setContacts} setImportToggle={setImportToggle} /> : ""}
            {contactToggle ? <AddContact handleAddFormChange={handleAddFormChange} handleAddFormSubmit={handleAddFormSubmit} setContactToggle={setContactToggle} /> : ""}
            </div>
            <form onSubmit={handleEditFormSubmit}>
            <table id="table" className="table table-striped table-hover">
             <thead>
              <tr>
              <th><input className="checkbox" type="checkbox" name="checkbox" value={JSON.stringify(contacts)} onClick={()=>setCheckAll(!checkAll)} checked={contacts.isChecked} onChange={(e)=>handlecheckbox(e)} /></th>
              <th>Asunto</th>
              <th>Apellidos</th>
              <th>Nombres</th>
              <th>Lugar de Trabajo</th>
              <th>Email</th>
              <th>Celular</th>
              <th>Direccion</th>
              <th>Notas</th>
            </tr>
          </thead>
          <tbody >
            {contacts.slice(pagesVisited, pagesVisited + usersPerPage).map((contact, key) => (
              <Fragment key={key}>
                {editContactId === contact.__rowNum__ ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />   
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}

                    isChecked={isChecked} setisChecked={setisChecked}
                      checkAll={checkAll} setCheckAll={setCheckAll}
                  />
                )}
              </Fragment>  
            ))}
          </tbody>
        </table>
      </form>

        {/* consoling the selected  */}
            {/* {console.log(isChecked)} */}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBtns"}
        previousLinkClassName={"previousBtn"}
        nextLinkClassName={"nextBtn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>

        
    )
}

export default ContactsList;