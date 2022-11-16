import React from "react"
import * as AiIcons from 'react-icons/ai'
import * as FaIcons from 'react-icons/fa'
export const SidebarData = [
    {
        label: 'Trang chủ',
        path: '/Home',
        icon: <AiIcons.AiFillHome/>,
    },
    {
        label: 'Người dùng',
        path: '/manageUser',
        icon: <AiIcons.AiOutlineUser/>,
    },
    {
        label: 'Blog',
        path: '/manageBlog',
        icon: <FaIcons.FaBloggerB/>,
    },
    {
        label: 'Bài đăng',
        path: '/managePost',
        icon: <FaIcons.FaPencilAlt/>,
    },
    {
        label: 'Hợp đồng',
        path: '/manageContract',
        icon: <FaIcons.FaPaypal/>,
    }
]