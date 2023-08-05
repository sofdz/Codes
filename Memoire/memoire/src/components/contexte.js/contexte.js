import {React,createContext, useState,useEffect} from 'react'
import { Navigate, useNavigate } from 'react-router-dom/dist'

export const Contexte=createContext()


export const Provider= ({children})=>{
    const [user,setuser]=useState(null)
    const [loading,setloading]=useState(false)
    
    useEffect(() => {
        https://ophtaback.onrender.com+'/estAuthentifie',{
            method:'GET',
            credentials: 'include' ,
            headers: {
            'Content-type': 'application/json; charset=UTF-8'
            }
          }
        ).then(res=>{
            if(res.status==401){
              console.log('pas encore authentifie')
                setloading(true)
            }
            res.json().then(data=>{
                setuser(data.user)
                    setloading(true)
            })}
                ).catch(e => console.log(e))
    }, [])
    return(
    <>
    <Contexte.Provider value={{user,setuser,loading}}>
   {children}
    </Contexte.Provider>

    </>
    )
}

