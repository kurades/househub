import React, { useState, useEffect } from 'react'
import { getProvinces } from '../../api/api'
import './style.css'
import CustomSelect from '../CustomSelect'
import Card from './Card'
import { Loader } from '../Blog'
import { setLimitRentItems } from '../../api/rentItem'
import { Link } from 'react-router-dom'
const MostRent = () => {
    const [rentItems, setRentItems] = useState(null)

    useEffect(() => {
        setLimitRentItems(setRentItems, 6);
    }, [])

    return (
        <div className='mostRent-container'>          
            <h1>Trọ, căn hộ có sẵn</h1>
            <div className="CardList-container">
                {rentItems ? rentItems.map((rentItem, index) => {
                    return <Card obj={rentItem}/>
                }) : <Loader/>}
                
            </div>
            <Link className="loadMore" to="/List">Xem thêm</Link>
        </div>
    )
}

export default MostRent
