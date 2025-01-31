import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import Home from './Home'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BarLoader } from 'react-spinners'
import { Story } from '../components/Story.jsx'
import { uploadFile } from '../utility/uploadFile.js'
import { addPost, readPosts, updatePost } from '../utility/crudUtility.js'
import { CategContext } from '../context/CategContext.jsx'
import { CategDropdown } from '../components/CategDropDown.jsx'
import { Alerts } from '../components/Alerts.jsx'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

export const AddEditPosts=()=> {
  const {categories} = useContext(CategContext)
  const {user} = useContext(UserContext)
  const [loading,setLoading] = useState(false)
  const [uploaded,setUploaded] = useState(false)
  const [photo,setPhoto]  = useState(null)
  const [story,setStory]  = useState(null)
  const [selCateg,setSelCateg] = useState(null)
  const [post,setPost] = useState(null)
  console.log(categories);
  const params = useParams()
  const { register,handleSubmit,formState: { errors },reset,setValue} = useForm();
  if(!user) return <Home/>
  useEffect(()=>{
    if(params?.id) readPosts(params.id,setPost)
  },[params?.id])
  console.log(post);
  useEffect(()=>{
  if(post){
    setValue("title",post.title)
    setSelCateg(post.category)
    setStory(post.story)
  }
},[post])

  const onSubmit =async (data)=>{
    //console.log(data.displayName);
    if(params.id){
      //update
      try{
      updatePost(params.id,{...data,category,story})
    }catch(error){
      console.log();
      
    }finally{
      
    }
    }else{
    
      //insert
      
    setLoading(true)
    let newPostData = {
      ...data,
      story,
      author:user.displayName,
      userId:user.uid,
      category:selCateg,
      likes:[]
      
    }
    console.log('postdata:',newPostData);
    try {
      const file = data?.file ? data?.file[0] : null
       const { url, id } = file ? await uploadFile(file) : {}
       delete newPostData.file
       newPostData={...newPostData,photo:{url,id}}
       console.log('postData: ',newPostData);
       addPost(newPostData)
       reset()
       setPhoto(null)
       setStory(null)
        // console.log(data);
        
        
        
      // updateUser(data.displayName, url+'/'+id)
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false)
    }
  }
  }
  
  return (
    <div className='page'>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="">A bejegyzés címe: </label>
        <input {...register('title', {required:!params.id}) } type='text' />
        <p className='text-danger'>{errors?.title&& 'A cím megadása kötelező'}</p>
      </div>
    <div>
      <CategDropdown categories={categories} setSelCateg={setSelCateg} selCateg={selCateg}/>
    <Story setStory={setStory} uploaded={uploaded}/>
    <input disabled={params.id} type='file' {...register('file',params.id?{}:{ required:true,
      validate:(value)=>{
        if(!value[0]) return true
        const acceptedFormats=['jpg','png','webp']
//        console.log(value[0]);
        const fileExtension=value[0].name.split('.').pop().toLowerCase()
        if(!acceptedFormats.includes(fileExtension)) return "Invalid File format"
        if(value[0].size>1*1000*1024) return "Az engedélyezett maximális fájl méret 1MB"
        return true
        
      }
    })} 
    onChange={(e)=>setPhoto( URL.createObjectURL(e.target.files[0]))}/>
    <p className='text-danger'>{errors?.file?.message}</p>
    <p className='text-danger' >{errors?.file && 'Fotó feltöltése kötelező!'}</p>
    </div>
    <input type="submit" disabled={!selCateg} />
      </form>
      {loading && <BarLoader />}
      {uploaded && <Alerts txt='Sikeres feltöltés!'/>}
      {photo && <img src={photo}/>} 
    </div>
  )
}
