import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Toastify } from '../components/Toastify';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


export default function Auth() {

  const  {user,signInUser, msg,setMsg, signUpUser}=useContext(UserContext)
  const navigate=useNavigate()
  const location=useLocation()
  console.log(location.pathname);
  const isSignIn = location.pathname=="/auth/in" // true

  useEffect(()=>{
    setMsg(null)
  },[])
  console.log(msg);
    

  const handleSubmit=(event)=>{
    event.preventDefault()
    setMsg({...msg,err:null})
    const data=new FormData(event.currentTarget)
    console.log(data);
    if(isSignIn){
    signInUser(data.get("email"),data.get("password"))
    }else{
      signUpUser(data.get("email"),data.get("password"),data.get("displayName"))
    }
  }

  return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="card w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-center text-2xl font-semibold mb-4">{isSignIn ? "Bejelentkezés" : "Regisztráció"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label text-white">E-mail</label>
                <input
                  type="email"
                  name='email'
                  placeholder="Adja meg az e-mail címét"
                  className="input input-bordered w-full bg-white text-black"
                />
              </div>
              <div className="form-control mb-6">
                <label className="label text-white">Jelszó</label>
                <input
                  type="password"
                  name='password'
                  placeholder="Adja meg a jelszavát"
                  className="input input-bordered w-full bg-white  text-black"
                />
              </div>
              {!isSignIn &&
                 <div className="form-control mb-6">
                 <label className="label text-white">Felhasználónév</label>
                 <input
                   type="displayName"
                   name='displayName'
                   placeholder="Adja meg a felhasználónevét"
                   className="input input-bordered w-full bg-white  text-black"
                 />
               </div>
              }
              <div className="form-control">
                <button type="submit" className="btn btn-primary w-full" >{isSignIn ? "Bejelentkezés" : "Regisztráció" }</button>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">Már van fiókja? <a href="/login" className="link link-primary">Bejelentkezés</a></p>
              </div>
              <button> Submit </button>
            </form>
            {msg && <Toastify {...msg}/>}
            <a href="#" onClick={()=>navigate('/pwreset')}>Elfelejtett jelszó...</a>
          </div>
        </div>
      </div>
  );
}
