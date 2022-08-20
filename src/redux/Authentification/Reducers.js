import { CUSTOMER_LOGIN, CUSTOMER_AUTH} from "./types";
// empty messages
const initialState = {
    auth: null
};

const customerReducer = (state = initialState, action) => {

    switch( action.type ) {
        case CUSTOMER_LOGIN:
            console.log("esyo aquis")
            console.log(action.payload)
            return {
                auth: {
                    // data: action.payload?.data?.customer,
                    // status: action.payload?.status
                    data: action.payload,
                    status: action.payload
                }
               
            }
        
        case CUSTOMER_AUTH:
            // console.log("estoy en auth")
            // console.log(action.payload)
            return {
                auth: action.payload
            }

        default: 
            return state;
    }     

} 

export default customerReducer;