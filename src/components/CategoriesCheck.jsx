import React from 'react'
import { CategContext } from '../context/CategContext';
import { useContext } from 'react';

export const CategoriesCheck = ({selCateg,setSelCateg}) => {
    const { categories } = useContext(CategContext);
    
    const handleChange=(event)=>{
        const {value,checked} = event.target
        setSelCateg(prev=>

            checked ? [...prev,value] : prev.filter(categ=>categ!=value)
        )
    }
  return (
    
    <div >
        {categories.map((obj) => 
             <form key={obj.id} action="">
                <label htmlFor=""><input value={obj.name} type="checkbox" name='asd' onChange={handleChange} checked={selCateg.includes(obj.name)} />{obj.name}</label>
             </form>
           
            )}
    </div>
  )
}

