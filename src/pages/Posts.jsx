import React, { useEffect, useState, useContext } from 'react'
import { readPosts } from '../utility/crudUtility'
import { CategContext } from '../context/CategContext'
import { MyCard } from '../components/MyCard'
import { CategoriesCheck } from '../components/CategoriesCheck'
import { Checkbox } from '@mui/material'
import { useSearchParams  } from 'react-router-dom'
export default function Posts() {
  const [searchParams] = useSearchParams()
  const [posts, setPosts] = useState([])
  const [selCateg,setSelCateg] = useState( searchParams.get('ctg') ? [searchParams.get('ctg')] : [])

  
  console.log('url paraméter:',searchParams.get('ctg'));
  
  useEffect(() => {
    readPosts(setPosts,selCateg)
  }, [selCateg])

  return (
    <>
    
   <CategoriesCheck selCateg={selCateg} setSelCateg={setSelCateg}/>
      <div
        className="min-h-screen bg-cover bg-center p-6 flex justify-center items-center"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dusfeoquh/image/upload/v1733399077/samples/landscapes/beach-boat.jpg')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="flex flex-wrap justify-center gap-8 w-full">
          {posts.map(obj => (
            <MyCard key={obj.id} {...obj} />
          ))}
        </div>
      </div>
    </>
  )
}

