import React from "react"
import * as AiIcons from 'react-icons/ai'
import * as FaIcons from 'react-icons/fa'
export const SidebarData = [
    {
        label: 'Thông tin cá nhân',
        path: '/user',
        icon: <AiIcons.AiOutlineUser/>,
    },
    {
        label: 'Quản lý tin đăng',
        path: '/post',
        icon: <FaIcons.FaPencilAlt/>,
    },
    
    {
        label: 'Quản lý blog',
        path: '/blog',
        icon: <FaIcons.FaBloggerB/>,
    },
    {
        label: 'Hợp đồng',
        path: '/contract',
        icon: <FaIcons.FaPaypal/>,
    }
]