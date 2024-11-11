// components/Layout.js
"use client";
import React, { useEffect } from "react";
import { Container } from "@mui/material";

import { useAuth } from "@/components/context/authContext";
import { useRouter } from "next/navigation";
import SidebarEmployee from "@/components/sidebar/sidebarEmployee";
import { ReloadRecordingProvider } from "@/components/context/reloadRecordingContext";

export default function RootLayout({ children }) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  if (!isLoggedIn) {
    router.push("/signin");
    return;
  }
  return (
    <div style={{ display: "flex" }}>
      <SidebarEmployee />
      <Container
        component="main"
        style={{ marginLeft: "0px", padding: "24px" }}
      >
        <ReloadRecordingProvider>
          <div className={`container mx-auto`}>{children}</div>
        </ReloadRecordingProvider>
      </Container>
    </div>
  );
}
