import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import { deleteBlog, getBlogs } from '../../api/BlogAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const ManageBlog = () => {
    const [blogs, setBlogs] = useState(null)
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

    useEffect(() => {
        getBlogs(setBlogs)
    }, [])

    return (
        <>
            <Row>
                <h2>Quản lý Blog</h2>
            </Row>
            <ToastContainer/>
            <div className="table-container">
                <table className="table-blog">
                    <tr>
                        <th>ID</th>
                        <th>Tiêu đề</th>
                        <th>Ảnh nền</th>
                        <th>Ngày đăng bài</th>
                        <th>Link</th>
                        <th></th>
                    </tr>
                    {blogs && blogs.data.map((blog, index) => {
                        return <tr>
                            <td>{blog._id}</td>
                            <td>{blog.title}</td>
                            <td className="profile-table-image"><img src={blog.imageAddress} alt="" /></td>
                            <td><Moment format="YYYY/MM/DD">
                            {blog.created_at}
                            </Moment></td>
                            <td><Link to={`/blog/${blog._id}`}>Dẫn đến bài viết</Link></td>
                            <td><button onClick={() => {
                                setIdDelete(blog._id)
                                setIsOpenDelete(true)
                            }} className="user-item-delete">Xóa</button></td>  
                        </tr>
                    })}
                </table>
                {blogs && <Pagination
                    activePage={blogs.current_page}
                    itemsCountPerPage={blogs.per_page}
                    totalItemsCount={blogs.total}
                    pageRangeDisplayed={5}
                    onChange={(num) => getBlogs(setBlogs, num)}
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
                    await deleteBlog(idDelete, toast)
                    await getBlogs(setBlogs)
                    setIsOpenDelete(false)
                }} className="login-button">Xác nhận</button>
                <button onClick={() => setIsOpenDelete(false)} className="alter-button">Hủy</button>
                </div>
            </Modal>
        </>
    )
}

export default ManageBlog
