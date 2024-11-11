import { useState } from "react";
import TabRecordingRoute from "../tab/tabRecordingRoute";
import TabRecordingHistory from "../tab/tabRecordingHistory";
import { Box, Tab, Tabs } from "@mui/material";

export default function BoxElectricRecording() {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newIndex) => {
      setTabIndex(newIndex);
    };
    
    return (
      <Box sx={{ border: '1px solid #ddd', borderRadius: 2 }}>
        <Tabs value={tabIndex} onChange={handleTabChange} aria-label="form tabs">
          <Tab label="Lộ trình ghi điện" />
          <Tab label="Lịch sử ghi điện" />
        </Tabs>
        <Box sx={{ padding: 2, height: 'calc(100vh - 48px)', overflowY: 'auto' }}>
          {tabIndex === 0 && (
            <TabRecordingRoute/>
          )}
          {tabIndex === 1 && (
            <TabRecordingHistory/>
          )}
        </Box>
      </Box>
    );
}