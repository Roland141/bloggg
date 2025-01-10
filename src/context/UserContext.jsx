    import React from 'react'
import { auth } from '../utility/firebaseApp'
import {createUserWithEmailAndPassword, deleteUser, onAuthStateChanged,sendPasswordResetEmail,signInWithEmailAndPassword, signOut, updateProfile} from 'firebase/auth'
import { createContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

export const UserContext=createContext()

export const UserProvider=({children})=>{
    const [user, setUser ]=useState(null)
    const [msg,setMsg] = useState({})//

    useEffect(()=>{
        const unsubscribe= onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
        })
        return ()=>unsubscribe()
    },[])

    const signInUser = async(email,password)=>{
        setMsg({})//
        try {
            await signInWithEmailAndPassword(auth,email, password)
            setMsg({})
            setMsg({signin:'Sikeres Bejelentkezés'})
            // setMsg({...msg,signin:'Sikeres Bejelentkezés'})
        } catch (error) {
            console.log(error);
            setMsg({err:error})
            //setMsg({...msg,signin:error.msg})
        }
    }
    const logoutUser = async()=>{
        try {
            await signOut(auth)
            setMsg({})//    
        } catch (error) {
            console.log(error);
        }
    }
    const signUpUser = async(email,password,displayName)=>{
        try {
            await createUserWithEmailAndPassword(auth,email, password)
            await updateProfile(auth.currentUser,{displayName})
            setMsg({})//
            setMsg({signup:'sikeres regiszt'});//
            
        } catch (error) {
            //console.log(error);
            setMsg({err:error.msg})
            //setMsg({...msg,signin:error.msg})
        }
    }
    const resetPassword = async(email)=>{
        try {
            await sendPasswordResetEmail(auth,email)
            setMsg({})
            setMsg({resetPassword:'A jelszóvisszaállítási email elküldve!'})
        } catch (error) {
            setMsg({err:error.message})
        }
    }
    const updateCredentials=async (displayName) =>{
        try {
            await updateProfile(auth.currentUser,{displayName})
            setMsg({})
            setMsg({update:"Sikeres Módosíás!"})
        } catch (error) {
            
        }
    }
    const updateUser = async (displayName,photoURL)=>{
        try {
            if(displayName&&photoURL) await updateProfile(auth.currentUser,{displayName,photoURL})
            else if (displayName) await updateProfile(auth.currentUser,{displayName})
            else if (photoURL) await updateProfile(auth.currentUser,{photoURL})
            await updateProfile (auth.currentUser,{displayName})
            setMsg({})
            setMsg({update:"Sikeres módosítás"})
        } catch (error) {
            setMsg({err:error.message})
        }
    }
    const deleteAccount = async()=>{
        try {
            await deleteUser(auth.currentUser)
            console.log('Felhasználói fiók törölve');
            
        } catch (error) {
            console.log(error);
            
        }
    }
    return(
        <UserContext.Provider value={{user, signInUser,logoutUser,msg,setMsg,signUpUser,updateUser,updateCredentials,resetPassword, deleteAccount}}>
            {children}
        </UserContext.Provider>

    )
}