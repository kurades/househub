import React,{useState} from 'react'
import {Link} from 'react-router-dom'

function Dropdown({title,items=[]}){
    const [open,setOpen] = useState(false);
    const toggle = () => setOpen(!open);
    return(
        <div className="dropdown-menu" onMouseEnter={toggle} onMouseLeave={toggle}>
            <span className="dropdown-title">{title}</span>
            <div className={open?"dropdown-list active":"dropdown-list"}>
                {items.map(item=>(
                    <Link to="/" className='dropdown-item'>{item.name}</Link>
                ))}
            </div>
        </div>
    )
}

export default Dropdown;