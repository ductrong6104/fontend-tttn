import { Inter } from "next/font/google";
import "./globals.css";
// components/Layout.js
import React from 'react';
import SidebarAdmin from '@/components/sidebar/sidebarAdmin';
import { Container } from '@mui/material';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "@/components/context/authContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
        {children}
        </AuthProvider>
        <ToastContainer/>
      </body>
    </html>
  );
}
