import React, { useEffect, useState } from 'react'
import './style.css'
import Navbar from '../Navbar'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import * as GoIcons from 'react-icons/go'
import * as AiIcons from 'react-icons/ai'
import * as GiIcons from 'react-icons/gi'
import * as BiIcons from 'react-icons/bi'
import * as BsIcons from 'react-icons/bs'
import { Row, Col, Form } from 'react-bootstrap'
import { useParams } from 'react-router';
import { addCommentRentItem, getById, getOther } from '../../api/rentItem';
import Loading from '../Loading';
import defaultImage from '../../assets/images/login.png'
import Footer from '../../Components/Footer'
import { Link } from 'react-router-dom';
import { getUser } from '../../api/Common';
import Modal from 'react-modal';
import momo from '../../assets/images/momo.png'
import paypal from '../../assets/images/paypal.png'
import viettelpay from '../../assets/images/viettelpay.png'
import { addContract } from '../../api/ContractAPI';
import { Contract } from '../../model/Contract';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostDetail = (props) => {
    const id = useParams('id');
    const [loading, setLoading] = useState(false)
    const [comment, setComment] = useState({id: id.id, message: ""})
    const [check, setCheck] = useState(false)
    const [rentItem, setRentItem] = useState(null)
    const [other, setOther] = useState(null)
    const [modalIsOpen, setIsOpen] = useState(false)
    const [rentalPeriod, setRentalPeriod] = useState(1)
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    const [payment, setPayment] = useState(null)
    const changePayment = method => setPayment(method);

    useEffect(() => {
        getById(id.id, setRentItem, setOther)
    }, [props.match.params.id])

    const changeComment = (e) => {
        setComment({...comment, [e.target.name]: e.target.value})
    }

    const submit = () => {
        const contract = new Contract(rentItem.user._id, rentItem.amount * rentalPeriod, id.id, rentalPeriod)
        addContract(contract, toast)
        setIsOpen(false)
    }
    
    const addCmt = async () => {
        setLoading(true)
        await addCommentRentItem(comment)
        setLoading(false)
        getById(id.id, setRentItem, setOther)
    }

    const CommentSection = ({comment}) => {
        return (
            <div className="user-comment">
                <div className="main-comment-img">
                    <img src={comment.user.imageAddress ? comment.user.imageAddress : defaultImage} alt="" />
                </div>
                <div className="main-comment-content">
                    <Link to='/' className='user-name'>{comment.user.name}</Link>
                    <div className="comment-content">{comment.message}</div>
                    <div className="time-stamp">{comment.created_at}</div>
                </div>
            </div>);
    }
    return (
        <>
            <Navbar />
            <ToastContainer />
            {rentItem ? <Row className="post-detail">
                <Col xl="8">
                    <div className="post-detail-header">
                        <h2 className="post-detail-title">{rentItem.title}</h2>
                        <span className="post-detail-address"><GoIcons.GoLocation /> Địa chỉ: {rentItem.address.detailLocation}</span>
                        <div className="post-detail-rating">
                            <span>Đánh giá:</span>
                            <div className="post-detail-rating-stars">
                                <AiIcons.AiFillStar />
                                <AiIcons.AiFillStar />
                                <AiIcons.AiFillStar />
                                <AiIcons.AiFillStar />
                                <AiIcons.AiOutlineStar />
                            </div>
                        </div>
                    </div>
                    <div className="post-detail-carousel">
                        <Carousel>
                            <div className="carousel-item">
                                <img src={rentItem.imagesAddress.path1} />

                            </div>
                            <div className="carousel-item">
                                <img src={rentItem.imagesAddress.path2} />

                            </div>
                            <div className="carousel-item">
                                <img src={rentItem.imagesAddress.path3} />

                            </div>
                        </Carousel>
                    </div>
                </Col>
                <Col xl="3">
                    <div className="post-detail-user-field">
                        <div className="post-detail-user-avatar">
                            <img src={rentItem.user.imageAddress ? rentItem.user.imageAddress : defaultImage} alt="" />
                        </div>
                        <h2>{rentItem.user.name}</h2>
                        <button className="post-detail-user-button button-phone"><AiIcons.AiFillPhone /> <span>{rentItem.user.phone}</span></button>
                        <a href={rentItem.user.fb}><button className="post-detail-user-button"><AiIcons.AiFillFacebook /><span>Liên lạc qua Facebook</span> </button></a>
                        <a href={rentItem.user.zalo}><button className="post-detail-user-button"><img src="https://phongtro123.com/images/icon-zalo.png" alt="" width="20px" /> <span>Liên lạc qua Zalo</span></button> </a>
                    </div>
                </Col>
                <Col xl="8">
                    <Row className="post-detail-info">
                        <Col xl="5" className="post-detail-info-price">
                            <GiIcons.GiPriceTag />
                            <span>{rentItem.amount} VND/Tháng</span>
                        </Col>
                        <Col xl="5" className="post-detail-info-area">
                            <BiIcons.BiShapeSquare />
                            <span>{rentItem.area} m <sup>2</sup></span>
                        </Col>
                        <Col xl="5" className="post-detail-info-num">
                            <BsIcons.BsPeopleFill />
                            <span>{rentItem.people} người</span>
                        </Col>
                        <Col xl="5" className="post-detail-info-num">
                            <BsIcons.BsDoorOpen />
                            <span>Còn {rentItem.available} phòng có sẵn</span>
                        </Col>
                    </Row>
                </Col>
                <Col xl="7" className="detail-section">
                    <h2 className="section-title">Thông tin mô tả</h2>
                    <div class="section-content">
                        {rentItem.description}
                    </div>
                    <h2 className="section-title">Bản đồ</h2>
                    <p>Địa chỉ : {rentItem.address.detailLocation}</p>
                    <div className="section-map">
                        <iframe
                            loading="lazy"
                            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBT-FcupKSzJG1IuC4ZtNyQ-Qg0rdoY47k&q=${rentItem.address.detailLocation}`}>
                        </iframe>
                    </div>
                </Col>
                <Col xl="4" className="relevant">
                    <div className="relevant-container">
                        <h3 className="relevant-title">Cùng thành phố</h3>
                        <ul className="relevant-list">
                            {other && other.map((_rentItem, index) => {
                                return <li className="relevant-item">
                                    <div className="relevant-item-image">
                                        <img src={_rentItem.imagesAddress.path1} alt="" />
                                    </div>
                                    <div className="relevant-item-content">
                                        <Link to={`/post/${_rentItem._id}`}  ><h5 className="relevant-item-title">{_rentItem.title}</h5></Link>
                                        <p className="relevant-item-price">
                                            <GiIcons.GiPriceTag />
                                            <span>{_rentItem.amount} VND/Tháng</span>
                                        </p>
                                    </div>
                                </li>
                            })}
                        </ul>
                    </div>

                </Col>
                {(getUser() && rentItem.available > 0 && getUser()._id != rentItem.user._id) &&
                    <div className="navbar-login">
                        <button onClick={() => { setIsOpen(true) }} style={{ height: '30px' }} className="login-button">Thuê ngay</button>
                    </div>}
                {rentItem.available < 1 && <p><b>Đã hết phòng</b></p>}
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

                    {rentItem.comments.map((_comment, index) => {
                        return <CommentSection comment={_comment}/>
                    })}
                </div>
                </Col>
               
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setIsOpen(false)}
                    style={customStyles}
                >
                    <h1>Thuê</h1>
                    <Form.Group as={Col} className="search-input">
                        <Form.Control onChange={(e) => {
                            setRentalPeriod(parseInt(e.target.value))
                        }} type='number' placeholder="Số tháng"></Form.Control>
                    </Form.Group>
                    <h4>Giá: {rentItem.amount * rentalPeriod} VNĐ</h4>
                    <h4>Chọn phương thức thanh toán: </h4>
                    <ul className="payment-list">
                        <li className={(payment == 'momo') ? "payment-item chosen" : "payment-item"} ><img src={momo} onClick={() => changePayment('momo')} /> </li>
                        <li className={(payment == 'paypal') ? "payment-item chosen" : "payment-item"} onClick={() => changePayment('paypal')}><img src={paypal} /> </li>
                        <li className={(payment == 'viettelpay') ? "payment-item chosen" : "payment-item"} onClick={() => changePayment('viettelpay')}><img src={viettelpay} /> </li>
                    </ul>
                    <Form.Control onChange={(e) => setCheck(!check)} type="checkbox" value="term" name="term" required></Form.Control>
                    <span className="login-quote">Tôi đồng ý với các<Link to="/terms" className="login-link">điều khoản sử dụng</Link></span>
                    <div className="model-button-field">
                        <button onClick={() => setIsOpen(false)} className="alter-button">Hủy</button>
                        <button disabled={!check} onClick={submit} className="login-button">Xác nhận</button>
                    </div>

                </Modal>
            </Row> : <Loading />}

            <Footer />
        </>
    )
}

export default PostDetail
