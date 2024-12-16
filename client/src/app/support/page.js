"use client";
import SideNav from "@/components/DashboardComponents/SideNav";
import TopNav from "@/components/DashboardComponents/TopNav";
import SupportPage from "@/components/SupportPage";
import { useEffect, useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNav = () => {
    setIsOpen(!isOpen);
    console.log("opened");
  };
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="h-[100vh]">
      <TopNav toggleNav={toggleNav} />
      <div className="flex h-[89%]">
        <SideNav isOpen={isOpen} active={"support"} toggleNav={toggleNav} />
        <SupportPage />
      </div>
    </div>
  );
}
