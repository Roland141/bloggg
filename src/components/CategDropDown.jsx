import React, { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';


export const CategDropdown=({categories,setSelCateg,selCateg})=> {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  console.log(categories);
  
  return (
    <div>
      <Dropdown isOpen={dropdownOpen} toggle={toggle} >
        <DropdownToggle caret>{selCateg ? selCateg : 'Kategória'}</DropdownToggle>
        <DropdownMenu>
            {categories ? categories.map(obj =>
                <DropdownItem key={obj.name} onClick={()=>setSelCateg(obj.name)}>{obj.name}</DropdownItem>
          )
          : 
          <DropdownItem disabled>Nincs elérhető kategória</DropdownItem>
            }
          
        </DropdownMenu>
      </Dropdown>
    </div>
  );
} 