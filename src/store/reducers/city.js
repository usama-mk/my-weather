const cityReducer= (state='Tel Aviv', action)=>{
    switch(action.type){
        case 'SET_CITY': //cases are actions basically
            return action.payload;
        default:
            return state;
    }
}

export default cityReducer