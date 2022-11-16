import React, { useEffect, useState } from 'react'
import CustomSelect from '../CustomSelect'
import "./style.css"
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';
import { getDistricts, getProvinces, getWards } from '../../api/api'
import { addRentItem } from '../../api/post';
import Navbar from '../../Components/Navbar'
import PostCard from '../MostRent/Card'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostForm = () => {
    const [loading, setLoading] = useState(false)
    const [provinceOptions, changeProvinceOptions] = useState([]);
    const [districtOptions, changeDistrictOptions] = useState([]);
    const [wardOptions, changeWardOptions] = useState([]);
    const [rentItem, setRentItem] = useState({title: "", type: "", description: "", people: "", amount: "",area: "", image1: null, image2: null,image3: null, province: "", district: "", ward: "", street: "", available: 1})

    const updateProvince = (param) => {
        setRentItem({...rentItem, ["province"] : param.label})
        async function fetchDistricts() {
            let response = await getDistricts(param.value)
            changeDistrictOptions(response)
        }
        fetchDistricts()
    }

    const updateDistrict = (param) => {
        setRentItem({...rentItem, ["district"] : param.label})
        async function fetchWards() {
            let response = await getWards(param.value)
            changeWardOptions(response)
        }
        fetchWards()
    }

    const changeWard = (param) => {
        setRentItem({...rentItem, ["ward"] : param.label})
    }

    let defaultLocation = `${rentItem.street}, ${rentItem.ward}, ${rentItem.district}, ${rentItem.province}`

    const typeOpt = [{"value": 1, "label": "Trọ"},{"value": 2, "label": "Căn hộ"}, {"value": 3, "label": "Nhà"},{"value": 4, "label": "Villa"}];
    
    const [imageOverview, setImageOverview] = useState(null)

    const changeInput = (e) => {
        setRentItem({...rentItem, [e.target.name] : e.target.value})
    }

    const changeType = (param) => {
        setRentItem({...rentItem, ["type"] : param.label})
    }

    const changeImage1 = (param) => {
        setRentItem({...rentItem, ["image1"] : param.target.files[0]})
        var file = param.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function (e) {
            setImageOverview(reader.result)
        }.bind(this);
    }

    const changeImage = (param) => {
        setRentItem({...rentItem, [param.target.name] : param.target.files[0]})
    }

    const submit = async () => {
        setLoading(true)
        await addRentItem(rentItem, toast)
        setLoading(false)
    }

    useEffect(() => {
        async function fetchProvinces() {
            let response = await getProvinces()
            changeProvinceOptions(response)
        }
        fetchProvinces()
    }, [])
    
    const testItem={
        "_id" : {
            "$oid" : "6179510e075c0000da004062"
        },
        "views": 0,
        "address" : {
            "detailLocation" : "112 Nguyễn Minh Châu, Phường Hoà Quý, Quận Ngũ Hành Sơn, Thành phố Đà Nẵng",
            "province" : rentItem.province,
        },
        "amount" : rentItem.amount,
        "area" : rentItem.area,
        "description" : rentItem.description,
        "imagesAddress" : {
            "path1" : imageOverview,
        },
        "people" : rentItem.people,
        "title" : rentItem.title,
    }

    return (
        <div className="content-container">
            <ToastContainer/>
            <Form action=" " className="post-form" as={Row}>
                <Row className="my-5">
                    <h1 className="main-content-title">Đăng bài</h1>
                </Row>
                <Container className="post-address col-xl-12" as={Col}>
                    <Row >
                        <h2 className="px-4">Địa chỉ cho thuê</h2>
                    </Row>

                    <Row className="post-address-row">
                        <Col className="post-address-detail" md={6}>
                            <Col className="post-address-col">
                                <CustomSelect label="Tỉnh/Thành phố" onChange={updateProvince} opts={provinceOptions} />
                            </Col>
                            <Col className="post-address-col">
                                <CustomSelect label="Quận/Huyện" onChange={updateDistrict} opts={districtOptions} />
                            </Col>
                            <Col className="post-address-col">
                                <CustomSelect label="Phường/Xã" onChange={changeWard} opts={wardOptions} />
                            </Col>
                            <Col className="post-address-col">
                                <input type="text" placeholder="Đường/Phố" name="street" id="post-address-input" onChange={changeInput} />
                            </Col>
                        </Col>

                        <Col className="map">
                            <iframe
                                loading="lazy"
                                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBT-FcupKSzJG1IuC4ZtNyQ-Qg0rdoY47k&q=${defaultLocation},vietnam`}>
                            </iframe>
                        </Col>
                    </Row>
                </Container>
                <div className="post-desc col-xl-6">
                    <Row className="my-3">
                        <h2 >Thông tin mô tả</h2>
                    </Row>
                    <Form.Group as={Row} className="my-3">
                        <Form.Label>Tiêu đề</Form.Label>
                        <Form.Control type="text" className="post-input" name="title" onChange={changeInput}/>
                    </Form.Group>

                    <Form.Group as={Row} className="my-3">
                        <Form.Label>Loại hình</Form.Label>
                        <CustomSelect opts={typeOpt} name="type" onChange={changeType}/>
                    </Form.Group>

                    <Form.Group as={Row} className="my-3">
                        <Form.Label>Nội dung mô tả</Form.Label>
                        <Form.Control as="textarea" className="post-input post-textarea" name="description" onChange={changeInput} />
                    </Form.Group>

                    <Form.Group as={Row} className="my-3">
                        <Form.Label>Số người ở</Form.Label>
                        <Form.Control type="number" className="post-input mb-2 col-xl-6" name="people" onChange={changeInput} />
                    </Form.Group>
                    
                    <Form.Group as={Row} className="my-3">
                        <Form.Label>Số phòng có sẵn</Form.Label>
                        <Form.Control type="number" className="post-input mb-2 col-xl-6" name="available" onChange={changeInput} />
                    </Form.Group>

                    <Form.Group as={Row} className="my-3">
                        <Form.Label>Giá cho thuê(VND/Tháng)</Form.Label>
                        <Form.Control type="text" className="post-input mb-2 col-xl-6" name="amount" onChange={changeInput} placeholder="VD: 10000000" />
                    </Form.Group>
                    <Form.Group as={Row} className="my-3">
                        <Form.Label>Diện tích(m<sup>2</sup>)</Form.Label>
                        <Form.Control type="text" className="post-input mb-2 col-xl-6" name="area" onChange={changeInput} placeholder="VD: 50" />
                    </Form.Group>
                    <Form.Group as={Row} className="my-3">
                        <Form.Label>Hình ảnh 1</Form.Label>
                        <Form.Control type="file" className="post-input mb-2 col-xl-6" onChange={changeImage1}  />
                    </Form.Group>
                    <Form.Group as={Row} className="my-3">
                        <Form.Label>Hình ảnh 2</Form.Label>
                        <Form.Control type="file" className="post-input mb-2 col-xl-6" name="image2" onChange={changeImage}  />
                    </Form.Group>
                    <Form.Group as={Row} className="my-3">
                        <Form.Label>Hình ảnh 3</Form.Label>
                        <Form.Control type="file" className="post-input mb-2 col-xl-6" name="image3" onChange={changeImage}  />
                    </Form.Group>
                    <Form.Group as={Row} className="my-3">
                        <button disabled={loading} onClick={submit} className="post-input save-button mb-2 col-xl-12" > {loading && <span className="fa fa-refresh fa-spin"></span>} Xác nhận và đăng</button>
                    </Form.Group>
                </div>
                <Col xl="4" className="post-preview-container">
                    <div className="post-preview">
                        <h2 >Xem trước</h2>
                        <PostCard obj={testItem}/>
                    </div>
                </Col>
            </Form>
        </div>
    )
}


const index = () => {
    return (
        <>
            <Navbar/>
            <PostForm />
        </>
    )
}

export default index
