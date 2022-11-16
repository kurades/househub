import React, { useEffect, useState } from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import Pagination from 'react-js-pagination'
import { Link } from 'react-router-dom'
import { deleteRentItem, editRentItem, getUserRentItems } from '../../api/rentItem'
import Moment from 'react-moment'
import Modal from 'react-modal';
import { getProvinces } from '../../api/api'
import CustomSelect from '../../Components/CustomSelect'
import { RentItem } from '../../model/RentItem'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfilePost = () => {
    const [loading, setLoading] = useState(false)
    const [provinceOptions, changeProvinceOptions] = useState([]);
    const [rentItem, setRentItem] = useState({id: "", title: "", type: "", description: "", people: "", amount: "",area: "", province: "", detailLocation: "", available: 0})
    const typeOpt = [{ "value": 1, "label": "Trọ" }, { "value": 2, "label": "Căn hộ" }, { "value": 3, "label": "Nhà" }, { "value": 4, "label": "Villa" }];
    const [rentItems, setRentItems] = useState(null)
    const [modalIsOpenEdit, setIsOpenEdit] = useState(false);
    const [modalIsOpenDelete, setIsOpenDelete] = useState(false);
    const [idDelete, setIdDelete] = useState(null)
    const customStylesEdit = {
        content: {
            height: "70%",
            width: '70%',
            top: '55%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            position: 'absolute',
            zIndex: '10',
            overflowY: 'scroll'
        },
    };

    const customStylesDelete = {
        content: {
            top: '55%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            position: 'absolute',
            zIndex: '10',
        },
    };

    const changeInput = (e) => {
        setRentItem({...rentItem, [e.target.name] : e.target.value})
    }

    const changeType = (param) => {
        setRentItem({...rentItem, "type" : param.label})
    }

    const changeProvince = (param) => {
        setRentItem({...rentItem, "province" : param.label})
    }

    const submit = async () => {
        setLoading(true)
        await editRentItem(rentItem, toast)
        await getUserRentItems(setRentItems)
        setLoading(false)
        setIsOpenEdit(false)
    }

    useEffect(() => {
        async function fetchProvinces() {
            let response = await getProvinces()
            changeProvinceOptions(response)
        }
        fetchProvinces()
        getUserRentItems(setRentItems)
    }, [])

    return (
        <div className="profile-container">
            <ToastContainer/>
            <Modal
                isOpen={modalIsOpenEdit}
                onRequestClose={() => setIsOpenEdit(false)}
                style={customStylesEdit}
            >
                <div className="post-desc col-xl-12">
                    <h1>Sửa bài đăng</h1>
                    <Form.Group as={Row} className="my-3">
                        <Form.Control onChange={changeInput} name="title" defaultValue={rentItem.title} placeholder="Tiêu đề" type="text" className="post-input" />
                    </Form.Group>
                    <Form.Group as={Row} className="my-3">
                        <Form.Control onChange={changeInput} name="description" defaultValue={rentItem.description} placeholder="Mô tả" type="text" className="post-input" />
                    </Form.Group>
                    <Form.Group as={Row} className="my-3">
                        <Form.Control onChange={changeInput} name="detailLocation" defaultValue={rentItem.detailLocation} placeholder="Địa chỉ chi tiết" type="text" className="post-input" />
                    </Form.Group>
                    <Form.Group as={Row} className="my-3">
                        <CustomSelect defaultValue={rentItem.province} label="Tỉnh/Thành phố" onChange={changeProvince} opts={provinceOptions} />
                    </Form.Group>
                    <Form.Group as={Row} className="my-3">
                        <CustomSelect defaultValue={rentItem.type} placeholder="Loại hình" opts={typeOpt} onChange={changeType} />
                    </Form.Group>
                    <Form.Group as={Row} className="my-3">
                        <Form.Control defaultValue={rentItem.people} name="people" placeholder="Số người ở" type="number" className="post-input mb-2 col-xl-6" onChange={changeInput} />
                    </Form.Group>

                    <Form.Group as={Row} className="my-3">
                        <Form.Control defaultValue={rentItem.amount} placeholder="Giá cho thuê(VND/Tháng)" name="amount" type="text" className="post-input mb-2 col-xl-6" onChange={changeInput} placeholder="VD: 10000000" />
                    </Form.Group>
                    <Form.Group as={Row} className="my-3">
                        <Form.Control defaultValue={rentItem.amount} placeholder="Phòng có sẵn" name="available" type="text" className="post-input mb-2 col-xl-6" onChange={changeInput} />
                    </Form.Group>
                    <Form.Group as={Row} className="my-3">
                        <Form.Control defaultValue={rentItem.area} placeholder="Diện tích m2" name="area" type="text" className="post-input mb-2 col-xl-6" onChange={changeInput} placeholder="VD: 50" />
                    </Form.Group>
                    <button onClick={submit} disabled={loading} className="login-button">{loading && <span className="fa fa-refresh fa-spin"></span>}Xác nhận</button>
                </div>

            </Modal>
            <Modal
                isOpen={modalIsOpenDelete}
                onRequestClose={() => setIsOpenDelete(false)}
                style={customStylesDelete}
            >
                <h1>Bạn có chắc chắn muốn xóa?</h1>
                <div className="model-button-field">
                    <button onClick={() => setIsOpenDelete(false)} className="alter-button">Hủy</button>
                    <button onClick={async () => {
                        await deleteRentItem(idDelete, toast)
                        await getUserRentItems(setRentItems)
                        setIsOpenDelete(false)
                    }} className="login-button">Xác nhận</button>
                    
                </div>

            </Modal>
            <Row>
                <h1 className="profile-title">Quản lý tin đăng</h1>
            </Row>
            <div className="table-container">
                <table className="table-blog">
                    <tr>
                        <th>Tiêu đề</th>
                        <th>Ảnh nền</th>
                        <th>Giá (VNĐ/tháng)</th>
                        <th>Ngày đăng bài</th>
                        <th>Link</th>
                        <th></th>
                        <th></th>
                    </tr>
                    {rentItems && rentItems.data[0].map((_rentItem, index) => {
                        return <tr>
                            <td>{_rentItem.title}</td>
                            <td className="profile-table-image"><img src={_rentItem.imagesAddress.path1} alt="" /></td>
                            <td>{_rentItem.amount}</td>
                            <td><Moment format="YYYY/MM/DD">
                                {_rentItem.created_at}
                            </Moment></td>
                            <td><Link to={`/post/${_rentItem._id}`}>Dẫn đến bài đăng</Link></td>
                            <td><button onClick={() => {
                                setIdDelete(_rentItem._id)
                                setIsOpenDelete(true)
                            }} className="user-item-delete">Xóa</button></td>
                            <td><button onClick={() => {
                                setRentItem({...rentItem, "id" : _rentItem._id, "type" : _rentItem.type, "title" : _rentItem.title,"description" : _rentItem.description,"detailLocation" : _rentItem.address.detailLocation,"province" : _rentItem.address.province,"people" : _rentItem.people,"amount" : _rentItem.amount,"area" : _rentItem.area})
                                setIsOpenEdit(true)
                            }} className="user-item-edit">Sửa</button></td>
                        </tr>
                    })}
                </table>
                {rentItems && <Pagination
                    activePage={rentItems.current_page}
                    itemsCountPerPage={rentItems.per_page}
                    totalItemsCount={rentItems.total}
                    pageRangeDisplayed={5}
                    onChange={(num) => getUserRentItems(setRentItems, num)}
                    itemClass="page-item"
                    linkClass="page-link"
                    firstPageText="First"
                    lastPageText="Last"
                />}
            </div>
        </div>
    )
}

export default ProfilePost
