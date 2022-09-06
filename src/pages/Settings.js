import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import {  IconButton } from '@material-ui/core';
import { Button } from "@material-ui/core";
import {doSaveTokens} from "../redux/ConfigToken/Actions"
import * as crypto from 'crypto-js';
import {sendCredentials} from '../api/index'



const Settings = () => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [token, setToken] = useState('')
    const [phoneNumberId, setPhoneNumberId] = useState('')
    const [businessId, setBusinessId] = useState('')
    const dispatch = useDispatch()
    let auth = useSelector(state => state.customerReducer.auth)
    
    // local state to input
    const [isDisabled, setIsDisabled] = useState({ phone_num: true, what_token: true, phone_id: true, what_buss_id: true});

    useEffect(() => { 

        const itemStr = localStorage.getItem("whatsapp_app")

        if(!itemStr) 
        {
            return;
        }
      
        //console.log('renderiza useEFFECT')
        const item = JSON.parse(itemStr);
        setPhoneNumber(item.phoneNumber);
        setToken(item.token);
        setPhoneNumberId(item.phoneNumberId);
        setBusinessId(item.businessId)
        //setInputValues(item)
    }, [])

    const handleClick = ( value ) => {
        
        if(value === 'phone_num') {
            let lock = !isDisabled.phone_num
            setIsDisabled({...isDisabled, phone_num: lock})
        }
        if(value === 'what_token') {
            let lock = !isDisabled.what_token
            setIsDisabled({...isDisabled, what_token: lock})
        }

        if(value === 'phone_id') {
            let lock = !isDisabled.phone_id
            setIsDisabled({...isDisabled, phone_id: lock})
        }

        if(value == 'what_buss_id') {
            let lock = !isDisabled.what_buss_id
            setIsDisabled({...isDisabled, what_buss_id: lock})
        }
        //console.log(value)
       
    }

    const handleChangePhoneNumber = event => {
        setPhoneNumber(event.target.value);
        //console.log('PHONE NUM value is:', phoneNumber);
      };

    const handleChangeToken = event => {
        setToken(event.target.value);
        //console.log('TOKEN value is:', token);
    };

    const handleChangeId = event => {
        setPhoneNumberId(event.target.value);
        //console.log('PHONEID value is:', phoneId);
    };

    const handleBusinessId = event => {
        setBusinessId(event.target.value)
    }


    const setConfigurations = () => {

        if( phoneNumber && token && phoneNumberId && businessId)
        {
            //console.log('clicked')

            const config = {
                phoneNumber : phoneNumber,
                token : token,
                phoneNumberId : phoneNumberId,
                businessId: businessId
            }

            //let phoneEncrypt = crypto.AES.encrypt(phoneNumber, 'anykeyhere').toString();
            let tokenEncrypt = crypto.AES.encrypt(token, 'anykeyhere').toString();
            let phoneNumberIdEncrypt = crypto.AES.encrypt(phoneNumberId,'anykeyhere').toString();
            let businessIdEncrypt = crypto.AES.encrypt(businessId, 'anykeyhere').toString();

            const configEncrypt = {
                phoneNumber: phoneNumber,
                secretToken: tokenEncrypt,
                phoneNumberId: phoneNumberIdEncrypt,
                businessId: businessIdEncrypt,
                userId: auth?.data?.responseData?._id
            }

            //console.log(`phone ${phoneEncrypt}, token ${tokenEncrypt}, phoneId ${phoneIdEncrypt}`)
            sendCredentials(configEncrypt)
            dispatch(doSaveTokens(config))
        }
    }

    return (
        <div className="settings-app">
            <label >
                Insert phone number:
            </label>
            <input type="text"  disabled = {isDisabled.phone_num} onChange={handleChangePhoneNumber} value = {phoneNumber}/>
            <IconButton onClick = {() => handleClick('phone_num')}>
             <EditIcon/>
            </IconButton>
            <br/>
            <label >
                Insert secret token:
            </label>
            <input type="text" disabled = {isDisabled.what_token} onChange={handleChangeToken} value = {token}/>
            <IconButton onClick = {() => handleClick('what_token')}>
             <EditIcon/>
            </IconButton>
            <br/>
            <label >
                Insert number id:
            </label>
            <input type="text" disabled = {isDisabled.phone_id} onChange={handleChangeId} value = {phoneNumberId}/>
            <IconButton onClick = {() => handleClick('phone_id')}>
             <EditIcon/>
            </IconButton>
            <br/>
            <label >
                Insert whatsapp business account id:
            </label>
            <input type="text" disabled = {isDisabled.what_buss_id} onChange={handleBusinessId} value = {businessId}/>
            <IconButton onClick = {() => handleClick('what_buss_id')}>
             <EditIcon/>
            </IconButton>
            <br/>
            <br/>
            <br/>
            <Button 
                variant="contained"
                onClick={setConfigurations}
            >
                VALIDATE TOKENS
            </Button>

        </div>
    );
}

export default Settings;