// components/Sidebar.js
'use client'
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
const hoverStyle = css`
  padding: 20px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: Lavender;
  }
`;
const SidebarAdmin = () => {
    const pathname = usePathname();
    const isActive = (href) => {
        return pathname === href ? true : false;
    };
    const activeStyle = {
        backgroundColor: 'lightblue',
        borderLeft: '4px solid #1976D2', // màu sắc tùy chọn
    };
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
            }}
        >
            <List>
                <Link href="/manager/home">
                <div className='flex p-2 justify-center items-center' style={isActive('/manager/home') ? activeStyle : {}}
                        css={hoverStyle}>
                    <ListItemIcon className='ml-2'>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Trang chủ" />

                </div>
                </Link>
                <Link href="/manager/employee-management">
                <div className='flex p-2 justify-center items-center' style={isActive('/manager/employee-management') ? activeStyle : {}}
                        css={hoverStyle}>
                    <ListItemIcon className='ml-2'>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Quản lý nhân viên" />

                </div>
                </Link>

                <Link href="/manager/client-management">
                <div className='flex p-2 justify-center items-center' style={isActive('/manager/client-management') ? activeStyle : {}}
                        css={hoverStyle}>
                    <ListItemIcon className='ml-2'>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Quản lý khách hàng" />

                </div>
                </Link>

                <Link href="/manager/register-management">
                <div className='flex p-2 justify-center items-center' style={isActive('/manager/register-management') ? activeStyle : {}}
                        css={hoverStyle}>
                    <ListItemIcon className='ml-2'>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Quản lý các đơn đăng ký" />

                </div>
                </Link>

                <Link href="/manager/contract-management">
                <div className='flex p-2 justify-center items-center' style={isActive('/manager/contract-management') ? activeStyle : {}}
                        css={hoverStyle}>
                    <ListItemIcon className='ml-2'>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Quản lý hợp đồng" />

                </div>
                </Link>

                <Link href="/manager/meter-management">
                <div className='flex p-2 justify-center items-center' style={isActive('/manager/meter-management') ? activeStyle : {}}
                        css={hoverStyle}>
                    <ListItemIcon className='ml-2'>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Quản lý đồng hồ điện" />

                </div>
                </Link>

                <Link href="/manager/assignment-management">
                <div className='flex p-2 justify-center items-center' style={isActive('/manager/assignment-management') ? activeStyle : {}}
                        css={hoverStyle}>
                    <ListItemIcon className='ml-2'>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Phân công nhân viên" />

                </div>
                </Link>

                <Link href="/manager/statistical">
                <div className='flex p-2 justify-center items-center' style={isActive('/manager/statistical') ? activeStyle : {}}
                        css={hoverStyle}>
                    <ListItemIcon className='ml-2'>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Báo cáo thống kê" />

                </div>
                </Link>

                <Link href="/manager/account-management">
                <div className='flex p-2 justify-center items-center' style={isActive('/manager/account-management') ? activeStyle : {}}
                        css={hoverStyle}>
                    <ListItemIcon className='ml-2'>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Quản lý tài khoản" />

                </div>
                </Link>
            </List>
        </Drawer>
    );
};

export default SidebarAdmin;
