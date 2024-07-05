// components/Layout.js
import React from 'react';
import SidebarAdmin from '@/components/sidebar/sidebarAdmin';
import { Container } from '@mui/material';

const Layout = ({ children }) => {
    return (
        <div style={{ display: 'flex' }} className='overflow-x-auto'>
            <SidebarAdmin />
            <Container component="main" style={{ marginLeft: '0px', padding: '24px' }}>
            <div className="container mx-auto p-2">
                {children}
            </div>
                
            </Container>
        </div>
    );
};

export default Layout;
