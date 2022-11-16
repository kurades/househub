import React, { useState } from 'react'
import Logo from '../../assets/images/logo-white.png'
import { Link, useHistory } from 'react-router-dom'
import { Row, Col, Form } from 'react-bootstrap'
import LoginBg from '../../assets/images/login-bg.png'
import "./style.css"
import GoogleLogin from "react-google-login";
import { loginWithGG, register } from '../../api/loginAPI';

const Join = () => {
  const [check, setCheck] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({email: "", password: "", username: "", repassword: ""})
  const [errorInput, setErrorInput] = useState({email: null, password: null, username: null, repassword: null})
  const [error, setError] = useState(null)
  const history = useHistory()

  const changeInput = (e) => {
    setUser({...user, [e.target.name] : e.target.value})
  }

  const submit = async () => {
    setLoading(true)
    await register(user, errorInput, setErrorInput, history)
    setLoading(false)
  }

  const handleGG = (param) => {
    loginWithGG(param.tokenId, setError, history)
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
              <h2>Đăng ký ngay</h2>
              <span className="login-quote">Đã có tài khoản? <Link to="/login" className="login-link">Đăng nhập</Link></span>
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
              <Form>
              <Form.Group className="form-group">
                <Form.Label>Email</Form.Label>
                <br />
                <Form.Control type="email" className="login-input" placeholder="abc@xyz.com" name="email" onChange={changeInput} required />
                {errorInput.email && <div class="alert alert-danger">{errorInput.email}</div>}
              </Form.Group>

              <Form.Group className="form-group">
                <Form.Label>Tên người dùng</Form.Label>
                <br />
                <Form.Control type="text" className="login-input" placeholder="Nguyen Van A" name="username" onChange={changeInput} required />
                {errorInput.username && <div class="alert alert-danger">{errorInput.username}</div>}
              </Form.Group>

              <Form.Group className="form-group" >
                <Form.Label>Mật khẩu</Form.Label>
                <br />
                <Form.Control type="password" className="login-input" placeholder="********************" name="password" onChange={changeInput} required />
                {errorInput.password && <div class="alert alert-danger">{errorInput.password}</div>}
              </Form.Group>

              <Form.Group className="form-group" >
                <Form.Label>Nhập lại mật khẩu</Form.Label>
                <br />
                <Form.Control type="password" className="login-input" placeholder="********************" name="repassword" onChange={changeInput} required />
                  {errorInput.repassword && <div class="alert alert-danger">{errorInput.repassword}</div>}
                  {error && <div class="alert alert-danger">{error}</div>}
              </Form.Group>
              <Form.Control type="checkbox" value="term" name="term" onClick={() => setCheck(!check)} required></Form.Control>
              <span className="login-quote">Tôi đồng ý với <Link to="/terms" className="login-link">điều khoản sử dụng</Link></span>
              <Form.Group className="form-group" >
              <button disabled={loading || !check} onClick={submit} className="post-input save-button mb-2 col-xl-12" >{loading && <span className="fa fa-refresh fa-spin"></span>}Đăng ký</button>
              </Form.Group>
              </Form>
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

export default Join
