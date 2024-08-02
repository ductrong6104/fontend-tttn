// components/Sidebar.js
"use client";
import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";
import { usePathname } from "next/navigation";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ButtonCustome from "../button/button";
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
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const activeStyle = {
    backgroundColor: "lightblue",
    borderLeft: "4px solid #1976D2", // màu sắc tùy chọn
  };
  return (
    <div className="">
      <ButtonCustome onClick={toggleMenu}>{isOpen ? "Đóng Menu" : "Mở Menu"}</ButtonCustome>
      <Drawer
        variant="permanent"
        open={isOpen}
        sx={{
          width: 300,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 300, boxSizing: "border-box" },
        }}
      >
        <List className="w-72">
          <Link href="/manager/home">
            <div
              className="flex p-2 justify-center items-center"
              style={isActive("/manager/home") ? activeStyle : {}}
              css={hoverStyle}
            >
              <ListItemIcon className="ml-2">
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Trang chủ" />
            </div>
          </Link>
          <Link href="/manager/employee-management">
            <div
              className="flex p-2 justify-center items-center"
              style={
                isActive("/manager/employee-management") ? activeStyle : {}
              }
              css={hoverStyle}
            >
              <ListItemIcon className="ml-2">
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý nhân viên" />
            </div>
          </Link>

          <Link href="/manager/client-management">
            <div
              className="flex p-2 justify-center items-center"
              style={isActive("/manager/client-management") ? activeStyle : {}}
              css={hoverStyle}
            >
              <ListItemIcon className="ml-2">
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý khách hàng" />
            </div>
          </Link>

          <Link href="/manager/register-management">
            <div
              className="flex p-2 justify-center items-center"
              style={
                isActive("/manager/register-management") ? activeStyle : {}
              }
              css={hoverStyle}
            >
              <ListItemIcon className="ml-2">
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý các đơn đăng ký" />
            </div>
          </Link>

          <Link href="/manager/contract-management">
            <div
              className="flex p-2 justify-center items-center"
              style={
                isActive("/manager/contract-management") ? activeStyle : {}
              }
              css={hoverStyle}
            >
              <ListItemIcon className="ml-2">
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý hợp đồng" />
            </div>
          </Link>

          <Link href="/manager/meter-management">
            <div
              className="flex p-2 justify-center items-center"
              style={isActive("/manager/meter-management") ? activeStyle : {}}
              css={hoverStyle}
            >
              <ListItemIcon className="ml-2">
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý đồng hồ điện" />
            </div>
          </Link>

          <Link href="/manager/assignment-management">
            <div
              className="flex p-2 justify-center items-center"
              style={
                isActive("/manager/assignment-management") ? activeStyle : {}
              }
              css={hoverStyle}
            >
              <ListItemIcon className="ml-2">
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Phân công ghi điện" />
            </div>
          </Link>
          {/* <Link href="/manager/recording-management">
            <div
              className="flex p-2 justify-center items-center"
              style={
                isActive("/manager/recording-management") ? activeStyle : {}
              }
              css={hoverStyle}
            >
              <ListItemIcon className="ml-2">
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Ghi chỉ số điện" />
            </div>
          </Link> */}
          <Link href="/manager/bill-management">
            <div
              className="flex p-2 justify-center items-center"
              style={
                isActive("/manager/bill-management") ? activeStyle : {}
              }
              css={hoverStyle}
            >
              <ListItemIcon className="ml-2">
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý hóa đơn" />
            </div>
          </Link>
          <Link href="/manager/electricity-service-management">
            <div
              className="flex p-2 justify-center items-center"
              style={
                isActive("/manager/electricity-service-management") ? activeStyle : {}
              }
              css={hoverStyle}
            >
              <ListItemIcon className="ml-2">
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý dịch vụ điện" />
            </div>
          </Link>
          <Link href="/manager/statistical">
            <div
              className="flex p-2 justify-center items-center"
              style={isActive("/manager/statistical") ? activeStyle : {}}
              css={hoverStyle}
            >
              <ListItemIcon className="ml-2">
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Báo cáo thống kê" />
            </div>
          </Link>

          <Link href="/manager/account-management">
            <div
              className="flex p-2 justify-center items-center"
              style={isActive("/manager/account-management") ? activeStyle : {}}
              css={hoverStyle}
            >
              <ListItemIcon className="ml-2">
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý tài khoản" />
            </div>
          </Link>
          <Link href="/manager/setting">
            <div
              className="flex p-2 justify-center items-center"
              style={isActive("/manager/setting") ? activeStyle : {}}
              css={hoverStyle}
            >
              <ListItemIcon className="ml-2">
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Cài đặt" />
            </div>
          </Link>
        </List>
      </Drawer>
    </div>
  );
};

export default SidebarAdmin;
