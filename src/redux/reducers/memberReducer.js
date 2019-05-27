import {GET_MEMBERS, GET_MEMBER, DELETE_MEMBER} from '../actions/types'

const initialState = {
    members : [],
    member: {}
};

export default function(state=initialState, actions){
    switch(actions.type){
        case GET_MEMBERS:
        return {
            ...state,
            members: actions.payload
        };
        case GET_MEMBER:
        return {
            ...state,
            member: actions.payload
        };
        case DELETE_MEMBER:
        return {
            ...state,
            members:state.members.filter(member => member.id !== actions.payload)
        };


        default:
        return state;
    }
}