"use client"
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar"; 

export default function Header() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  return (
    <header>
      <div className="navbar bg-neutral text-neutral-content px-8">
        <div className="container justify-between mx-auto flex">
          <Link href="/">
            <div className="text-2xl font-bold uppercase">Dokke</div>
          </Link>
          <div className="md:hidden">
            <button
              onClick={toggleSidebar}
              className="menu-toggle block text-neutral-content text-2xl"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
          <div className="hidden md:flex gap-10">
            <Link href="/documents">
              <div className="text-neutral-content font-semibold">Documents</div>
            </Link>
            <Link href="/create">
              <div className="text-neutral-content font-semibold">Create new</div>
            </Link>
            <Link href="/login">
              <div className="text-neutral-content font-semibold">Login</div>
            </Link>
          </div>
        </div>
      </div>
      <Sidebar
        sidebarVisible={sidebarVisible}
        closeSidebar={closeSidebar}
      />
    </header>
  );
}


