
// components/Layout.js
'use client'
import React, { useEffect } from 'react';
import SidebarAdmin from '@/components/sidebar/sidebarAdmin';
import { Container } from '@mui/material';

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
            <div className={`container mx-auto`}>
                {children}
            </div>
            
            </Container>
          
        </div>
     
  );
}
