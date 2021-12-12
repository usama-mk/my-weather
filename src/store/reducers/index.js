import { combineReducers } from "redux";
import cityReducer from "./city";


const allReducers= combineReducers({
    city: cityReducer
});

export default allReducers;