import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo-white.png'
import defaultImage from '../../assets/images/login.png'
import { Row, Col } from 'react-bootstrap';
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { SidebarData } from './SidebarData'
import { Router, Switch, Route, useRouteMatch } from 'react-router-dom'
import { getUser } from '../../api/Common';
import "./style.css"
import ProfileUser from './ProfileUser';
import ProfileBlog from './ProfileBlog';
import ProfilePost from './ProfilePost';
import ProfileContract from './ProfileContract';

const Index = () => {
    const [user,setUser] = useState(getUser());
    const [sidebar, setSidebar] = useState(true);
    const showSidebar = () => setSidebar(!sidebar);
    let { path, url } = useRouteMatch();
    return (
        <div className="admin-page-container">
            <Row className="navbar" >
                <Col className="left" as={Row}>
                    <Link to="/" className="navbar-logo" id="admin-nav-logo">
                        <img src={logo} alt="" />
                    </Link>
                    <Col className="sidebar-icon">
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Col>
                </Col>

                <Col className="right">
                    <div className="user-field">
                        <div className="user-image">
                            <img src={(user.imageAddress) ? user.imageAddress : defaultImage} alt="" />
                        </div>
                        <div className="user-name">
                            <p>{user.name}</p>
                        </div>
                    </div>
                    <div className="searchbar-container">
                        <div className="searchbar" >
                            <AiIcons.AiOutlineSearch />
                            <input type="text" name="" id="" placeholder="Type to search" />
                        </div>
                    </div>
                </Col>
            </Row>
            <Row className="admin-mainpage">
                <Col xl="1" className={sidebar ? "sidebar active" : "sidebar"}>
                    <div className="sidebar-background"></div>
                    <ul className="sidebar-items">
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className="sidebar-item">
                                    <Link activeClassName="navbar-item-active" to={`${url + item.path}`}>{item.icon} <span>{item.label}</span></Link>
                                </li>
                            )
                        })}
                    </ul>
                </Col>

                <Col className={sidebar ? "admin-page on" : "admin-page"}>
                    <Switch>
                        <Route path={`${url}/user`} component={ProfileUser} />
                        <Route path={`${url}/blog`} component={ProfileBlog} />
                        <Route path={`${url}/post`} component={ProfilePost} />
                        <Route path={`${url}/contract`} component={ProfileContract} />
                    </Switch>

                </Col>
            </Row>


        </div>

    )
}

export default Index;
