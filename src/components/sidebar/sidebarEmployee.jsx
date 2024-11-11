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
const SidebarEmployee = () => {
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
          <Link href="/employee/home">
            <div
              className="flex p-2 justify-center items-center"
              style={isActive("/employee/home") ? activeStyle : {}}
              css={hoverStyle}
            >
              <ListItemIcon className="ml-2">
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Trang chủ" />
            </div>
          </Link>
          <Link href="/employee/electric-recording">
            <div
              className="flex p-2 justify-center items-center"
              style={
                isActive("/employee/electric-recording") ? activeStyle : {}
              }
              css={hoverStyle}
            >
              <ListItemIcon className="ml-2">
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Ghi chỉ số điện" />
            </div>
          </Link>
          <Link href="/employee/bill-management">
            <div
              className="flex p-2 justify-center items-center"
              style={
                isActive("/employee/bill-management") ? activeStyle : {}
              }
              css={hoverStyle}
            >
              <ListItemIcon className="ml-2">
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý hóa đơn" />
            </div>
          </Link>
          <Link href="/employee/map-recording">
            <div
              className="flex p-2 justify-center items-center"
              style={
                isActive("/employee/map-recording") ? activeStyle : {}
              }
              css={hoverStyle}
            >
              <ListItemIcon className="ml-2">
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Bản đồ ghi điện" />
            </div>
          </Link>
          
          <Link href="/employee/setting">
            <div
              className="flex p-2 justify-center items-center"
              style={isActive("/employee/setting") ? activeStyle : {}}
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

export default SidebarEmployee;
