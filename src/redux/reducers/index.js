import {combineReducers} from "redux"
import errorsReducer from './errorsReducer'
import memberReducer from "./memberReducer";
import { reducer as formReducer } from "redux-form";

export default combineReducers ({
    errors:errorsReducer,
    member:memberReducer,
    form: formReducer
})