import React from 'react'
import { sanitizeHTML } from '../utility/utils'
import { useNavigate } from 'react-router-dom'
export const MyCard = ({ id, title, photo, category, story }) => {
  const navigate = useNavigate()
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-6"
      style={{

        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }} onClick={()=>navigate('/detail/'+id)}
    >
      <div className="flex flex-wrap justify-center gap-6">
        <div className="border border-gray-200 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
          <img
            src={photo["url"]}
            alt={title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">{category}</div>
          <p>{sanitizeHTML(story).substring(0, 30)}...</p>
        </div>
       
      </div>
    </div>
  )
}
