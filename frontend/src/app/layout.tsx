import "@mantine/core/styles.css";
import "./globals.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { AuthProvider } from "./context/AuthContext";
import React from "react";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <title>My App</title>
      </head>
      <body>
        <AuthProvider>
          <MantineProvider defaultColorScheme="light">
            {children}
          </MantineProvider>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
