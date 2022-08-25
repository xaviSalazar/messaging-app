import { registerCustomer, loginCustomer, customerAuth, customerLogOut } from "../../api";
import {CUSTOMER_REGISTER, CUSTOMER_LOGIN, CUSTOMER_AUTH, CUSTOMER_LOGOUT} from './types'


export const doRegisterCustomer = (data) => async(dispatch) => {

    try {
        const customerData = await registerCustomer(data);

        dispatch( {type: CUSTOMER_REGISTER, payload: customerData})

        return {type: CUSTOMER_REGISTER,payload: customerData}

    } catch(error) {
        return error.response.data
    }

}

export const doLoginCustomer = (data) => async(dispatch) => {

    try {
        const customerData = await loginCustomer(data);

        dispatch( {type: CUSTOMER_LOGIN, payload: customerData})
        return {type: CUSTOMER_LOGIN, payload: customerData}
  
    } catch(error) {
        return error.response.data
    }

}

export const doCustomerAuth = (data) => async(dispatch) => {

    const token = localStorage.getItem('customerToken');
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    }


    try {
        const customerData = await customerAuth(config);

        dispatch( {type: CUSTOMER_AUTH, payload: customerData})

        return {type: CUSTOMER_AUTH,payload: customerData}

    } catch(error) {
        return error.response.data
    }

}


export const doCustomerLogout = (data) => async(dispatch) => {

    const token = localStorage.getItem('customerToken');
    const config = {
        headers: {Authorization: `Bearer ${token}`}
    }


    try {
        const customerData = await customerLogOut(config);

        dispatch( {type: CUSTOMER_LOGOUT, payload: customerData})

        return {type: CUSTOMER_LOGOUT, payload: customerData}

    } catch(error) {
        return error.response.data
    }

}




