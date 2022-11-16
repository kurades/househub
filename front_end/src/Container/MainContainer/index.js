import React, { useState, useEffect } from 'react'
import './style.css'
import MostRent from '../../Components/MostRent'
import Navbar from '../../Components/Navbar'
import banner from '../../assets/images/search-banner.jpg'
import CustomSelect from '../../Components/CustomSelect'
import { getProvinces } from '../../api/api'
import Blog from '../../Components/Blog'
import Footer from '../../Components/Footer'
import { Col, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const Index = () => {
    const typeOptions = [{"value": 1, "label": "Trọ"},{"value": 2, "label": "Căn hộ"}, {"value": 3, "label": "Nhà"},{"value": 4, "label": "Villa"}];
    const [provinceOptions, changeProvinceOptions] = useState([]);
    const [province, setProvince] = useState("")
    const [type, setType] = useState("")
    const [amount, setAmount] = useState("")

    const changeProvince = (param) => {
        setProvince(param.label)
    }

    const changeType = (param) => {
        setType(param.label)
    }

    const changeAmount = (param) => {
        setAmount(param.target.value)
    }

    useEffect(() => {
        async function fetchProvinces() {
            let response = await getProvinces()
            changeProvinceOptions(response)
        }
        fetchProvinces()
    }, [])
    return (
        <>
            <Navbar />

            <div className="search-container">
                <div className="search-area">
                    <h1>TÌM PHÒNG TRỌ VỪA Ý BẠN </h1>
                    <div className="search-dropdown-area">
                        <CustomSelect label='Thành phố' onChange={changeProvince} opts={provinceOptions} />
                        <CustomSelect label='Loại hình' onChange={changeType} opts={typeOptions}/>
                        <Form.Group as={Col} className="search-input">
                            <Form.Control type='number'  onChange={changeAmount} placeholder="Giá (up to)"></Form.Control>
                        </Form.Group>
                        <Link to={`/List?province=${province}&type=${type}&amount=${amount}`} >  
                        <button className='search-button'><i class="far fa-paper-plane"></i></button>
                        </Link>
                    </div>
                </div>
                <div className="search-banner">
                    <img src={banner} alt="" />
                </div>
            </div>
            <MostRent />
            <Blog />
            <Footer />
        </>
    )
}

export default Index
