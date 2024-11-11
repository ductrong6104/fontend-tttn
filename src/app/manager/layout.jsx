// components/Layout.js
"use client";
import React, { useEffect } from "react";
import SidebarAdmin from "@/components/sidebar/sidebarAdmin";
import { Container } from "@mui/material";

import { useAuth } from "@/components/context/authContext";
import { useRouter } from "next/navigation";
import { AutoAssignProvider } from "@/components/context/autoAssignContext";

export default function RootLayout({ children }) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  if (!isLoggedIn) {
    router.push("/signin");
    return;
  }
  return (
    <div style={{ display: "flex" }}>
      <SidebarAdmin />
      <Container
        component="main"
        style={{ marginLeft: "0px", padding: "24px" }}
      >
        <AutoAssignProvider>
          <div className={`container mx-auto`}>{children}</div>
        </AutoAssignProvider>
      </Container>
    </div>
  );
}
