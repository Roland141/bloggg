import React from 'react'
import { MyCard } from './MyCard'
export const CardsContainer = ({posts}) => {
  return (
    <div>
      {posts && posts.map(obj=><MyCard key={obj.id} {...obj}/>)}
    </div>
    
  )
}

