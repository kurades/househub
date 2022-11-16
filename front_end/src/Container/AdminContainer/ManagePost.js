import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import Moment from 'react-moment';
import { deleteRentItem, getRentItems } from '../../api/rentItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

const ManagePost = () => {
    const [rentItems, setRentItems] = useState(null)
    const [idDelete, setIdDelete] = useState(null)
    const [modalIsOpenDelete, setIsOpenDelete] = useState(false);
    const customStylesDelete = {
        content: {
            top: '55%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            position: 'absolute',
        },
    };

    useEffect(() => {
        getRentItems(setRentItems);
    }, [])

    return (
        <>
            <Row>
                <h2>Quản lý bài viết</h2>
            </Row>
            <ToastContainer />
            <div className="table-container">
                <table className="table-blog">
                    <tr>
                        <th></th>
                        <th>ID</th>
                        <th>Tiêu đề</th>
                        <th>Loại</th>
                        <th>Ngày đăng bài</th>
                        <th>Link</th>
                        <th></th>
                    </tr>
                    {rentItems && rentItems.data.map((rentItem, index) => {
                        return <tr>
                            <td><div className="object-cover blog-item-image"><img src={rentItem.imagesAddress.path1} alt="" /></div></td>
                            <td>{rentItem._id.$oid}</td>
                            <td>{rentItem.title}</td>
                            <td>{rentItem.type}</td>
                            <td><Moment format="YYYY/MM/DD">
                            {rentItem.created_at}
                            </Moment></td>
                            <td><Link to={`/post/${rentItem._id}`}>Dẫn đến bài viết</Link></td>
                            <td><button onClick={() => {
                                setIdDelete(rentItem._id.$oid)
                                setIsOpenDelete(true)
                            }} className="user-item-delete">Xóa</button></td>  
                        </tr>
                    })}
                </table>
                {rentItems && <Pagination
                    activePage={rentItems.current_page}
                    itemsCountPerPage={rentItems.per_page}
                    totalItemsCount={rentItems.total}
                    pageRangeDisplayed={5}
                    onChange={(num) => getRentItems(setRentItems, num)}
                    itemClass="page-item"
                    linkClass="page-link"
                    firstPageText="First"
                    lastPageText="Last"
                />}
                
            </div>
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
                        await getRentItems(setRentItems);
                        setIsOpenDelete(false)
                    }} className="login-button">Xác nhận</button>
                </div>
            </Modal>
        </>
    )
}

export default ManagePost
