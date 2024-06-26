"use client";
import { Provider } from "react-redux";
import "../globals.css";
import { store } from "@/store";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body>{children}</body>
      </Provider>
    </html>
  );
}
