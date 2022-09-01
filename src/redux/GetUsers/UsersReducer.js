
// empty users list
const initialState = []

export default (users_list = initialState, action) => {

    switch( action.type ) {
        case 'GET-ALL-USERS':
            return action.payload;
        case 'SEARCH-USER':
           //console.log("inside search")
           //console.log(action.payload)
           return [action.payload];
        case 'NEW-MESSAGE':
            const index = users_list.findIndex(object => {
                return object.phoneNumber === action.payload.from;
            });
            if (index !== -1) {
                users_list[index].lastMessage = action.payload.message;
            }
            return users_list;
        
        default:
            return users_list;
    }

} 