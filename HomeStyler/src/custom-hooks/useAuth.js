import React, {useState,useEffect}from 'react'
import { onAuthStateChang, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase.config'


const useAuth = () => {
  const [currentUser,setCurrentUser]=useState({})
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        setCurrentUser(user)

      }
      else{
        setCurrentUser(null)
      }
    })
  })
  return (
    {
      currentUser,
    }
  )
}

export default useAuth
