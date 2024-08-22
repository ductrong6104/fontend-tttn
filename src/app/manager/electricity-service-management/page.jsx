'use client'

// components/FormTabs.js
import { useState } from 'react';
import { Tabs, Tab, Box, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import TableComponent from '@/components/table/tableComponent';
import BoxElectricType from '@/components/box/boxElectricType';
import BoxLevel from '@/components/box/boxLevel';
import BoxElectricPrice from '@/components/box/boxElectricPrice';
export default function PageManagedElectricityService() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };
  
  return (
    <Box sx={{ width: '100%', height: '100vh' }}>
      <Tabs value={tabIndex} onChange={handleTabChange} aria-label="form tabs">
        <Tab label="Loại điện" />
        <Tab label="Bậc" />
        <Tab label="Giá" />
      </Tabs>
      <Box sx={{ padding: 2, height: 'calc(100vh - 48px)', overflowY: 'auto' }}>
        {tabIndex === 0 && (
          <BoxElectricType/>
        )}
        {tabIndex === 1 && (
          <BoxLevel/>
        )}
        {tabIndex === 2 && (
          <BoxElectricPrice/>
        )}
      </Box>
    </Box>
  );
}
