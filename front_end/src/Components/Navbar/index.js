import React, { useEffect, useState } from 'react'
import './style.css'
import logo from '../../assets/images/logo-black.png'
import defaultImage from '../../assets/images/login.png'
import { Link, NavLink } from 'react-router-dom'
import Dropdown from './Dropdown'
import { useHistory } from 'react-router'
import { getUser, removeUserSession } from '../../api/Common'
import * as FiIcons from 'react-icons/fi'
import * as BiIcons from 'react-icons/bi'
import { getUserNotifications, seenNotification } from '../../api/NotificationAPI'
import { getRentItems, searchAll, searchRentItem } from '../../api/rentItem'

function DisplayUser({ user }) {
    const [userMenu, setUserMenu] = useState(false);
    const [notiState, setNotiState] = useState(false); //noti dropdown
    const [label, setLabel] = useState(false); // notification label 
    const changeUserMenu = () => setUserMenu(!userMenu);
    const [notifications, setNotifications] = useState([])
    const history = useHistory()
    const [unreadNotifications, setUnreadNotifications] = useState([])
    const [isUnreadSelect, setIsUnreadSelect] = useState(false)

    useEffect(() => {
        async function init() {
            const response = await getUserNotifications();
            setNotifications(response)
            response.map((notification, index) => {
                if (notification.isSeen == false) {
                    setLabel(true)
                    setUnreadNotifications(oldArray => [...oldArray, notification]);
                }
            })
        }
        init()
    }, [])

    const logout = () => {
        removeUserSession()
        history.push('/')
        window.location.reload()
    }

    //set 'noti-item' to 'noti-item unread' to set unread state
    const NotiItem = ({ item }) => {
        return (
            <li >
                <div className={`noti-item ${!item.isSeen && 'unread'}`} onClick={async () => {
                    if (!item.isSeen)
                        await seenNotification(item._id)
                    history.push(item.type == "rentItem" ? `/post/${item.postId}` : `/blog/${item.postId}`)
                }}>
                    <div className="noti-user-image"><img src={item.sender.imageAddress ? item.sender.imageAddress : defaultImage} alt="" /></div>
                    <span>{item.sender.name} đã {item.action == "rent" ? "thuê phòng của bạn" : "bình luận bài đăng của bạn"} </span>
                </div>
            </li>
        )
    }

    if (user) {
        return (
            <div className="navbar-login">
                <div className={label ? 'noti-icon active' : 'noti-icon'}><BiIcons.BiBell title="Notifications" className='noti-bell' onClick={() => setNotiState(!notiState)} /></div>

                <div className={notiState ? "noti-dropdown active" : "noti-dropdown"}>
                    <h4 className='noti-title'>Thông báo</h4>
                    <div className="noti-filter">
                        <div className={`noti-filter-item ${!isUnreadSelect && 'active'}`} onClick={() => setIsUnreadSelect(false)} name='all'>All</div>
                        <div className={`noti-filter-item ${isUnreadSelect && 'active'}`} onClick={() => setIsUnreadSelect(true)} name='unread'>Unread</div>
                    </div>
                    <ul className='noti-dropdown-list'>
                        {isUnreadSelect ? unreadNotifications.map((notification, index) => {
                            return <NotiItem item={notification} />
                        }) : notifications.map((notification, index) => {
                            return <NotiItem item={notification} />
                        })}
                        {isUnreadSelect && unreadNotifications.length == 0 && <p>Không có thông báo nào!</p>}
                        {!isUnreadSelect && notifications.length == 0 && <p>Không có thông báo nào!</p>}
                    </ul>
                </div>
                <div>
                    <div onClick={changeUserMenu} className="navbar-profile-image"><img src={user.imageAddress ? user.imageAddress : defaultImage} alt="" /></div>
                    <div className={userMenu ? "user-dropdown active" : "user-dropdown"}>
                        <ul className="user-dropdown-list">
                            {user.type == "admin" ? <li className="user-dropdown-item" ><BiIcons.BiGroup /> <span><Link to="/admin/home">Adminstration</Link></span> </li> :
                                <li className="user-dropdown-item" ><BiIcons.BiPlus /> <span><Link to="/Post">Đăng tin</Link></span> </li>}
                            <li className="user-dropdown-item" ><BiIcons.BiUserPin /> <span><Link to="/profile/user">Trang cá nhân</Link></span> </li>
                            <li className="user-dropdown-item" onClick={logout}><FiIcons.FiLogOut /> <span>Đăng xuất</span> </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="navbar-login">
                <NavLink to='/login' >
                    <button className="login-button">Đăng nhập</button>
                </NavLink>
            </div>
        )
    }
}
const searchResultItem = (item, setIsClickItem) => {
    return (
        <li className="search-result-item" onMouseEnter={() => {setIsClickItem(true)}}
        onMouseLeave={() => {setIsClickItem(false)}}>
            <div className="search-result-image">
                <img src={item.area ? item.imagesAddress.path1 : item.imageAddress} alt="" />
            </div>
            <Link to={item.area ? `/post/${item._id}` : `/blog/${item._id}`} className="search-result-title">{item.title}</Link>
        </li>
    )
}
function Index() {
    const [allItems, setAllItems] = useState(null);
    const [searchItems, setSearchItems] = useState([]);
    const [searchToggle, setSearchToggle] = useState(false);
    const [isClickItem, setIsClickItem] = useState(false);

    useEffect(() => {
        searchAll(setAllItems)
    }, [])

    const onSearching = (e) => {   
        if (allItems) {
            setSearchItems(allItems && allItems.filter((item) => {
                let lowercaseTitleSearch = e.target.value.toLowerCase();
                let lowercaseTitle = item.title.toLowerCase();
                return lowercaseTitle.includes(lowercaseTitleSearch)
            }))
        }
    }

    return (
        <>
            <div className="navbar-container">
                <div className="navbar-content">
                    <NavLink to='/' className="navbar-logo"><img src={logo} alt="logo" /></NavLink>
                    <div className="navbar-search-container">
                        <div className="navbar-search" onFocus={() => {setSearchToggle(true)}}
                            onBlur={() => {if (!isClickItem) setSearchToggle(false)}}
                        >   
                            <BiIcons.BiSearchAlt />
                            <input type="text" className='navbar-search-input' onChange={onSearching}/>
                            {searchToggle && searchItems && searchItems.length > 0 ? <div className="search-result-container">
                                <ul className="search-result-list">
                                    {searchItems.map((item, index) => {
                                        return searchResultItem(item, setIsClickItem)
                                    })}
                                </ul>
                            </div> : <></>}
                        </div>
                    </div>
                    <div className="navbar-menu">
                        <ul className="navbar-list">
                            <li >
                                <NavLink className="navbar-item" activeClassName="navbar-item-active" to='/' exact>Trang Chủ</NavLink>
                            </li>
                            <li >
                                <NavLink className="navbar-item" activeClassName="navbar-item-active" to='/List' exact>Danh Sách</NavLink>
                            </li>
                            <li >
                                <NavLink className="navbar-item" activeClassName="navbar-item-active" to='/Blog'>Blog</NavLink>
                            </li>
                            <li >
                                <NavLink className="navbar-item" activeClassName="navbar-item-active" to='/guide'>Hướng dẫn</NavLink>
                            </li>
                            <li >
                                <NavLink className="navbar-item" activeClassName="navbar-item-active" to='/terms'>Điều khoản</NavLink>
                            </li>
                        </ul>
                        <DisplayUser user={getUser()} />
                    </div>
                </div>




            </div>
        </>
    )
}

export default Index
