import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { NotFound } from './NotFound'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { uploadFile } from '../utility/uploadFile'
import {Toastify} from '../components/Toastify'
import { BarLoader } from 'react-spinners'
import { useEffect } from 'react'
import { extractUrlAndId } from '../utility/utils'
export const Profile=()=> {
  const {user,updateUser,msg} = useContext(UserContext)
  // const [photo,setPhoto ] =useState(null)
  const [loading,setLoading] = useState(false)
  const [avatar,setAvatar]  = useState(null)

  useEffect(()=>{
    user?.photoURL && setAvatar(extractUrlAndId(user.photoURL).url)
  },[user])

  const { register,handleSubmit,formState: { errors } } = useForm({defaultValues:{
    displayName:user?.displayName || '',
    // displayName:user?.photoURL || ''
  }});
  if(!user) return <NotFound/>
  const onSubmit =async (data)=>{
    //console.log(data.displayName);
    
    setLoading(true)
    try {
      const file = data?.file ? data?.file[0] : null
      const { url, id } = file ? await uploadFile(file) : {}
      
      updateUser(data.displayName, url+'/'+id)
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false)
    }
    
  }
  return (
    <div className='page'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="">Felhasználónév:</label>
          <input {...register('displayName') } type='text' />
        </div>
      <div>
        <label>Avatar:</label>
      <input type='file' {...register('file',{
        validate:(value)=>{
          if(!value[0]) return true
          const acceptedFormats=['jpg','png','webp']
          console.log(value[0]);
          const fileExtension=value[0].name.split('.').pop().toLowerCase()
          if(!acceptedFormats.includes(fileExtension)) return "Invalid File format"
          if(value[0].size>1*1000*1024) return "Az engedélyezett maximális fájl méret 1MB"
          return true
          
        }
      })} 
      onChange={(e)=>setAvatar( URL.createObjectURL(e.target.files[0]))}/>
      <p className='text-danger'>{errors?.file?.message}</p>
      </div>
      <input type="submit" />
        </form>
        {loading && <BarLoader />}
        {msg && <Toastify {...msg}/>}
        {avatar && <img src={avatar}/>} 
      </div>
  )
}
