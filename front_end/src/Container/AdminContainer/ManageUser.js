import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import { deleteUser, getUsers } from '../../api/AdminAPI';
import defaultImage from '../../assets/images/login.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import Moment from 'react-moment';

const ManageUser = () => {
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
            zIndex: '10',
        },    
    };

    const [users, setUsers] = useState(null)

    useEffect(() => {
        getUsers(setUsers)
    }, [])

    return (
        <>
            <Row>
                <h2>Quản lý người dùng</h2>
            </Row>
            <ToastContainer/>
            <div className="table-container">
                <table className="table-blog">
                    <tr>
                        <th></th> 
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Ngày tham gia</th>
                        <th></th>
                    </tr>
                    {users && users.data[0].map((user, index) => {
                        return <tr>
                            <td><div className="object-cover user-item-image"><img src={user.imageAddress ? user.imageAddress : defaultImage} alt="" /></div></td>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td><Moment format="YYYY/MM/DD">
                            {user.created_at}
                            </Moment></td>
                            <td><button onClick={() => {
                                setIdDelete(user._id)
                                setIsOpenDelete(true)
                            }} className="user-item-delete">Xóa</button></td>  
                        </tr>
                    })}
                </table>
                {users && <Pagination
                    activePage={users.current_page}
                    itemsCountPerPage={users.per_page}
                    totalItemsCount={users.total}
                    pageRangeDisplayed={5}
                    onChange={(num) => getUsers(setUsers, num)}
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
                    <button onClick={async () =>  {
                        await deleteUser(idDelete, toast)
                        await getUsers(setUsers)
                        setIsOpenDelete(false)
                    }} className="login-button">Xác nhận</button>
                    <button onClick={() => setIsOpenDelete(false)} className="alter-button">Hủy</button>
                </div>
            </Modal>
        </>
    )
}

export default ManageUser
