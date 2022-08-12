
// empty messages
const initialState = []

export default (msg_list = initialState, action) => {

    switch( action.type ) {
        case 'GET-ALL-USERS':
            return action.payload;
        case 'SEARCH-USER':
           console.log("inside search")
           console.log(action.payload)
           return [action.payload];
        
        default:
            return msg_list;
    }

} 