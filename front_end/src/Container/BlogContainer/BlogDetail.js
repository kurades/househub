import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import defaultImage from '../../assets/images/login.png'
import { useParams } from 'react-router'
import * as AiIcons from 'react-icons/ai'
import { addCommentBlog, getById, getLimitBlogs } from '../../api/BlogAPI'
import Loading from '../../Components/Loading'
import Footer from '../../Components/Footer'
import Moment from 'react-moment'
import { getUser } from '../../api/Common'

const BlogDetail = (props) => {
    const [blog, setBlog] = useState(null)
    const id = useParams('id')
    const [loading, setLoading] = useState(false)
    const [other, setOther] = useState(null)
    const [comment, setComment] = useState({id: id.id, message: ""})

    useEffect(() => {
        getById(id.id, setBlog)
        getLimitBlogs(setOther, 3)
    }, [props.match.params.id]) 

    const changeComment = (e) => {
        setComment({...comment, [e.target.name]: e.target.value})
    }

    const addCmt = async () => {
        setLoading(true)
        await addCommentBlog(comment)
        setLoading(false)
        getById(id.id, setBlog)
    }

    const CommentSection = ({comment}) => {
        return (
            <div className="user-comment">
                <div className="main-comment-img">
                    <img src={comment.user.imageAddress ? comment.user.imageAddress : defaultImage} alt="" />
                </div>
                <div className="main-comment-content">
                    <div className='user-name'><b>{comment.user.name}</b></div>
                    <div className="comment-content">{comment.message}</div>
                    <div className="time-stamp">{comment.created_at}</div>
                </div>
            </div>);
    }
    return (
        <>
            <Navbar />
            {blog?<Row className="blog-detail-container">
                <Col xl="8" className="blog-detail-content">
                    <div className="blog-detail-info">
                        <div className="left">
                            <div className="blog-detail-author">
                                <div className="author-image">
                                    <img src={blog.user.imageAddress ? blog.user.imageAddress : defaultImage} alt="" />
                                </div>
                                <div className="author-info">
                                    <div><b>{blog.user.name}</b></div>
                                </div>
                            </div>
                        </div>
                        <div className="right">
                            <span>Đăng ngày : <Moment format="YYYY/MM/DD">
                            {blog.created_at}
                            </Moment></span>
                            <span><AiIcons.AiOutlineEye /> {blog.views}</span>
                        </div>
                    </div>
                    <article class="blog-article">
                        <h2>{blog.title}</h2>
                        <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
                    </article>      
                </Col>
                
                <Col xl="3" className="blog-detail-side">
                    <div className="blog-detail-side-1">
                        <h3>Có thể bạn quan tâm</h3>
                        <ul className="side-1-list">
                            {other && other.map((_blog, index) => {
                                return <li className="relevant-item">
                                <div className="relevant-item-image">
                                    <img src={_blog.imageAddress} alt="" />
                                </div>
                                <div className="relevant-item-content">
                                <Link to={`/blog/${_blog._id}`}  ><h5 className="relevant-item-title">{_blog.title}</h5></Link> 
                                </div>
                            </li>
                            })}
                        </ul>
                    </div>
                </Col>
                <Col xl='7'>
                <div className="comment-section" >
                    {getUser() && <div className='main-comment'>
                        <div className="main-comment-img">
                            <img src={getUser().imageAddress ? getUser().imageAddress : defaultImage} alt="" />
                        </div>
                        <div className="main-comment-input">
                            <input type="text" name="message" onChange={changeComment} placeholder='Add a comment ...' />
                            
                        </div>
                        <button disabled={loading} type="submit" onClick={addCmt} className='login-button submit-button' >{loading && <span className="fa fa-refresh fa-spin"></span>}Đăng</button>
                    </div>}

                    {blog.comments.map((_comment, index) => {
                        return <CommentSection comment={_comment}/>
                    })}
                </div>   
                </Col>
            </Row>:<Loading/>}
            <Footer/>
        </>
    )
}

export default BlogDetail
