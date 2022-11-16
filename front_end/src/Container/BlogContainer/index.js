import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import Navbar from '../../Components/Navbar'
import { Link } from 'react-router-dom';
import "./style.css"
import { getBlogs } from '../../api/BlogAPI';
import Card from '../../Components/Blog/Card';
import Pagination from 'react-js-pagination';
import { getUser } from '../../api/Common';
import { Loader } from '../../Components/Blog/index'
import Footer from '../../Components/Footer'
const blogButton = {
    width: "120px",
    height: "40px",
    borderRadius: "13px",
    border: "none",
    cursor: "pointer",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e3e3e3",
    float: "right",
}
const imageHeight = {
    height: "400px"
}
const Index = () => {
    const [blogs, setBlogs] = useState(null)

    useEffect(() => {
        getBlogs(setBlogs)
    }, [])

    return (
        <>
            <Navbar />
            <div className="content-container">
                <Row className="mt-5">
                    <Col xs="10"><h1 className="main-content-title">Blog</h1></Col>
                    {getUser() && <Col ><Link style={blogButton} to="postBlog"><i class="fas fa-plus-square"></i>&#160; Đăng blog</Link></Col>}

                </Row>
                {(blogs) ?
                    <Row className="justify-content-center">
                        {blogs && blogs.data.map((blog) =>
                            <Card obj={blog} />
                        )}
                        <Pagination
                            activePage={blogs.current_page}
                            itemsCountPerPage={blogs.per_page}
                            totalItemsCount={blogs.total}
                            pageRangeDisplayed={5}
                            onChange={(num) => getBlogs(setBlogs, num)}
                            itemClass="page-item"
                            linkClass="page-link"
                            firstPageText="First"
                            lastPageText="Last"
                        />
                    </Row> : <Row className="justify-content-center"><Loader /><Loader /></Row>
                }

            </div>
            <Footer/>
        </>
    )
}

export default Index;
