import React, { useState } from 'react'
import { CKEditor } from 'ckeditor4-react';
import { Alert, Form, Row, Col } from 'react-bootstrap';
import { addBlog } from '../../api/post';
import Navbar from '../../Components/Navbar'
import BlogCard from '../Blog/Card'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUser } from '../../api/Common';

const Index = () => {
    const [loading, setLoading] = useState(false)
    const [blog, setBlog] = useState({title: "", description: "", image: ""})
    const [content, setContent] = useState("")
    const [overviewImage, setOverviewImage] = useState(null)

    const changeInput = (e) => {
        setBlog({...blog, [e.target.name] : e.target.value})
    }

    const changeOverviewImage = (param) => {
        var file = param.target.files[0];
        setBlog({...blog, ["image"] : file})
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function (e) {
            setOverviewImage(reader.result)
        }.bind(this);
    }

    const changeContent = (param) => {
        setContent(param.editor.getData())
    }

    const submit = async () => {
        setLoading(true)
        await addBlog(blog, content, toast)
        setLoading(false)
    }

    const object = {
        __id : " ",
        "user" : {
            "name" : getUser().name
        },
        "views" : 0,
        "imageAddress" : overviewImage,
        "title" : blog.title,
        "description" : blog.description
    }
    
    return (
        <>
            <Navbar />
            <div className="content-container">
                <ToastContainer />
                <Row className="mt-5">
                    <h1>Tạo blog cho riêng bạn</h1>
                </Row>
                <Row className="mt-4">
                    <Col md="7">
                        <Form.Group className="my-3">
                            <Form.Label className="px-3">Tiêu đề</Form.Label>    <br />
                            <Form.Control type="text" className="post-input" name="title" onChange={changeInput} />
                        </Form.Group>
                        <Form.Group className="my-3">
                            <Form.Label className="px-3">Mô tả</Form.Label>  <br />
                            <Form.Control type="textarea" className="post-input" name="description" onChange={changeInput} />
                        </Form.Group>
                        <Form.Group className="my-3">
                            <Form.Label className="px-3">Ảnh</Form.Label>    <br />
                            <Form.Control type="file" className="post-input mb-2 col-xl-6" name="image" onChange={changeOverviewImage} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Nội dung</Form.Label>   <br />
                            <CKEditor onChange={changeContent} />
                        </Form.Group>
                        <Form.Group className="my-3">
                            <button disabled={loading} onClick={submit} className="post-input save-button mb-2 col-xl-12" > {loading && <span className="fa fa-refresh fa-spin"></span>} Xác nhận và đăng</button>
                        </Form.Group>
                    </Col>
                    <Col >
                        <BlogCard obj={object}/>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Index
