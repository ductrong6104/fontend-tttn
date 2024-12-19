import { Inter } from "next/font/google";
import "./globals.css";
// components/Layout.js
import React, { Suspense } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "@/components/context/authContext";

import Loader from "@/components/page/pageLoaderProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
        <ToastContainer />
        <Loader />
      </body>
    </html>
  );
}
