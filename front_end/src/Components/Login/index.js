import React, { useState } from 'react'
import Logo from '../../assets/images/logo-white.png'
import LoginBg from '../../assets/images/login-bg.png'
import { Link, useHistory } from 'react-router-dom'
import { Row, Col, Form } from 'react-bootstrap'
import "./style.css"
import { login, loginWithGG } from '../../api/loginAPI'
import GoogleLogin from "react-google-login";

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({email: "", password: ""})
    const [error, setError] = useState(null)
    const history = useHistory()

    const changeInput = (e) => {
        setUser({...user, [e.target.name] : e.target.value})
    }

    const submit = async () => {
        setLoading(true)
        await login(user, setError, history)
        setLoading(false)
    }

    const handleGG = async (param) => {      
        setLoading(true)
        await loginWithGG(param.tokenId, setError, history)      
        setLoading(false)
    }

    return (
        <>
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
                            <h2>Đăng nhập để trải nghiệm</h2>
                            <span className="login-quote">Bạn chưa có tài khoản? <Link to="/join" className="login-link">Đăng ký</Link></span>
                        </Row>
                        <Row>
                            <GoogleLogin
                                clientId="246456551142-222jord9ruqrqlafkbnm7212euatdihl.apps.googleusercontent.com"
                                buttonText="Đăng nhập với Google"
                                onSuccess={handleGG}
                                className="btn btn-google btn-block justify-content-center"
                                cookiePolicy={'single_host_origin'} />
                        </Row>
                        <Row><h4 className="legend"><span>hoặc</span></h4></Row>
                        <Row>
                            <Form.Group className="form-group">
                                <Form.Label>Tài khoản đăng nhập</Form.Label>
                                <br />
                                <Form.Control type="text" className="login-input" placeholder="abc@xyz.com" name="email" onChange={changeInput} />
                            </Form.Group>

                            <Form.Group className="form-group" >
                                <Form.Label>Mật khẩu</Form.Label>
                                <br />
                                <Form.Control type="password" className="login-input" placeholder="********************" name="password" onChange={changeInput} />
                            </Form.Group>

                            <span className="login-quote">Quên mật khẩu? <Link to="/forgot" className="login-link">Lấy lại mật khẩu</Link></span>
                            <Form.Group className="form-group" >
                                <button disabled={loading} onClick={submit} className="post-input save-button mb-2 col-xl-12" >{loading && <span className="fa fa-refresh fa-spin"></span>}Đăng nhập</button>
                            </Form.Group>
                            <div class="alert">
                                {error}
                            </div>
                        </Row>
                    </div>

                </Col>
            </Row>
        </>
    )
}

export default Login
