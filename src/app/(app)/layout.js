"use client";
import { SideBar, SideMenu } from "@/components";
import "../globals.css";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";

export default function RootLayout({ children }) {

  const [show, setShow] = useState(null);

  return (
    
    <Provider store={store}>
    <html lang="en">
      <body className="flex w-screen h-screen">
          <div className="">
            <div className="w-auto h-full rounded-sm">
              <SideBar show={show}></SideBar>
            </div>
          </div>
          <div className="flex flex-col grow">
            <Navbar onShow={setShow}></Navbar>
            <div className="grow p-5 bg-slate-200">
              <div>{children}</div>
            </div>
          </div>
        </body>
      </html>
      </Provider>
  );
}
