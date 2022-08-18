const initialState = {
    phoneNumber : "",
    token : ""
}


export default (number = initialState, action) => {
    switch( action.type ) {
        case 'SET-CONFIG':
            console.log(action.payload)
            return action.payload
        default:
            return number;
    }
} 