import axios from 'axios'
import {GET_ERRORS, GET_MEMBERS, GET_MEMBER, DELETE_MEMBER} from './types'

export const addMember = (member, history) => async dispatch => {
    try{
        await axios.post("http://localhost:8080/api/members", member);
        history.push("/members");
        dispatch({
            type:GET_ERRORS,
            payload:{}
        })
    }catch(error){
        dispatch({
            type:GET_ERRORS,
            payload:error.response.data
        })
    }
}

export const getBackLog = () => async dispatch => {
    const res = await axios.get("http://localhost:8080/api/members");
    dispatch({
        type:GET_MEMBERS,
        payload:res.data
    })
}

export const getMember = (member_id, history) => async dispatch => {
   try{
        const res = await axios.get(`http://localhost:8080/api/members/${member_id}`);
        dispatch({
            type:GET_MEMBER,
            payload:res.data
        })
   }catch(error){
    // history.push("/");
   }
}
export const deleteMember = member_id => async dispatch => {
    if(
        window.confirm(
            `You are deleting member ${member_id}, this action can not be undone`
            )
    ){
        // const res = await axios.delete(`http://localhost:8080/members/${member_id}`);
        const res = await axios.delete(`http://localhost:8080/api/members/${member_id}`, {
      
        });
        dispatch({
            type:DELETE_MEMBER,
            payload:member_id
        })
    }
}