const initialState = []


export default (msg = initialState, action) => {
    switch( action.type ) {
        case 'NEW-MESSAGE':
            //console.log(`new message`)
            //console.log(action.payload)
            return [...msg, action.payload]
        default:
            return msg;
    }
} 