import React, { useState } from 'react'
import Logo from '../../assets/images/logo-white.png'
import LoginBg from '../../assets/images/login-bg.png'
import { Link, useHistory } from 'react-router-dom'
import { Row, Col, Form } from 'react-bootstrap'
import "./style.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { resetPassword } from '../../api/loginAPI'

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")

    const submit = async () => {
        setLoading(true)
        await resetPassword(email, toast)
        setLoading(false)
    }

    return (
        <>
            <ToastContainer/>
            <Row className="login-container">
                <Col xl='6' className="left">
                    <Link to="/">
                        <div className="login-logo">
                            <img src={Logo} alt="" />
                        </div>
                    </Link>

                    <div className="login-bg">
                        <img src={LoginBg} alt="" />
                    </div>
                </Col>
                
                <Col xl='6' className="right">
                    <div className="login-field">
                        <Row>
                            <h2>Quên mật khẩu</h2>
                            <span className="login-quote">Đã có tài khoản? <Link to="/login" className="login-link">Đăng nhập</Link></span>
                        </Row>
                        <Row>
                            <Form.Group className="form-group">
                                <Form.Label>Email</Form.Label>
                                <br />
                                <Form.Control type="text" className="login-input" placeholder="abc@xyz.com" name="email" onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="form-group" >
                                <button disabled={loading} onClick={submit} className="post-input save-button mb-2 col-xl-12" >{loading && <span className="fa fa-refresh fa-spin"></span>}Xác nhận</button>
                            </Form.Group>
                            <h5>Mật khẩu ngẫu nhiên sẽ gửi vào email của bạn</h5>
                        </Row>
                    </div>

                </Col>
            </Row>
        </>
    )
}

export default ForgotPassword
