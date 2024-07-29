
// components/Layout.js
'use client'
import React, { useEffect } from 'react';
import SidebarAdmin from '@/components/sidebar/sidebarAdmin';
import { Container } from '@mui/material';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '@/components/context/authContext';
import { useRouter } from 'next/navigation';




export default function RootLayout({ children }) {
  const {isLoggedIn} = useAuth();
  const router = useRouter();

  if (!isLoggedIn) {
    router.push('/sigin');
    return;
  } 
  return (
    
      <div style={{ display: 'flex' }}>
            <SidebarAdmin />
            <Container component="main" style={{ marginLeft: '0px', padding: '24px' }}>
            <div className={`container mx-auto ${document.documentElement.scrollHeight <= window.innerHeight ? 'h-screen': 'h-fit'}`}>
                {children}
            </div>
            
            </Container>
            <ToastContainer/>
        </div>
     
  );
}
