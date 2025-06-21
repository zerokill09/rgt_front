"use client";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";

export default function MuiThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = createTheme({
    typography: {
      fontFamily: "var(--font-noto-sans-kr), var(--font-roboto), sans-serif",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
