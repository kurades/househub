import React from 'react'
import {Row,Col} from 'react-bootstrap'
import Logo from '../assets/images/logo-white.png'
import {Link} from 'react-router-dom'
import * as BsIcons from 'react-icons/bs'
const Footer = () => {
    return (
        <>
                <div className="footer">
                    <div className="footer-background"></div>
                    <div className="footer-container">
                        <Row>
                            <Col className="footer-logo"><img src={Logo} alt="" /></Col>
                        </Row>
                        <Row className="footer-contents">
                            <Col xl="4">
                                <h3>Về BRAND</h3>
                                <ul className="footer-content-1 footer-content">
                                    <li><Link to="/">Trang chủ</Link> </li>
                                    <li><Link to="/">Danh sách</Link></li>
                                    <li><Link to="/">Blog</Link></li>
                                    <li><Link to="/">Quy định sử dụng</Link></li>
                                    <li><Link to="/">Chính sách bảo mật</Link></li>
                                </ul>
                            </Col>
                            <Col xl="4">
                                <h3>Hỗ trợ khách hàng</h3>
                                <ul className="footer-content-2 footer-content">
                                    <li><Link to="/">Câu hỏi thường gặp</Link></li>
                                    <li><Link to="/">Hướng dẫn đăng tin</Link></li>
                                    <li><Link to="/">Quy định đăng tin</Link></li>
                                </ul>
                            </Col>
                            <Col xl="4">
                                <h3>Theo dõi chúng tôi</h3>
                                <ul className="footer-content-3 footer-content">
                                    <li className="icon-fb"><Link to="/"><BsIcons.BsFacebook /></Link></li>
                                    <li className="icon-tw"><Link to="/"><BsIcons.BsTwitter /></Link></li>
                                    <li className="icon-in"><Link to="/"><BsIcons.BsInstagram /></Link></li>
                                </ul>
                            </Col>
                        </Row>
                        <Row className="copyright">
                            <p>© 2021. All rights reserved.</p>
                        </Row>
                    </div>
                </div>
        </>
    )
}

export default Footer
