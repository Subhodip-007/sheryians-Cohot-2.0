import { useDispatch } from "react-redux";
import { getUser, login, register } from "../services/auth.api";
import {setUser ,setLoading ,setError} from "../auth.slice"
export function useAuth (){
    const dispatch = useDispatch()
    async function handleRegister({email,username,password}) {
        try{
            dispatch(setLoading(true))
            const data = await register({email , username , password})
        }catch(err){
            dispatch(setError(err.response?.data?.message || "registration falied"))
        }finally{
            dispatch(setLoading(false))
        }
    }
    async function handleLogin(email,password){
        try{
            dispatch(setLoading(true))
            const data = await login({email ,password})
            dispatch(setUser(data.user))

        }catch(err){
            dispatch(setError(err.response?.data?.message || "login falied"))
        }finally{
            dispatch(setLoading(false))
        }
    }
        async function handleGetMe(){
        try{
            dispatch(setLoading(true))
            const data = await getUser({email ,password})
            dispatch(setUser(data.user))

        }catch(err){
            dispatch(setError(err.response?.data?.message || "login falied"))
        }finally{
            dispatch(setLoading(false))
        }
    }
    return {
        handleRegister,
        handleLogin,
        handleGetMe
    }

}